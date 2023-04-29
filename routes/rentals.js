const { mongoose, ClientSession } =  require("mongoose");
const express = require('express');
const router = express.Router();
const { Movie, } = require('../models/movie');
const { Rental, validate } = require('../models/rental');
const Fawn = require('fawn');
const { Customer } = require('../models/customer');

// mongoose.connect('mongodb://127.0.0.1:27017/RentalDb')
//     .then(() => console.log('Connected to db'))
//     .catch((err) => console.error('While connecting db getting error', err));

Fawn.init('mongodb://127.0.0.1:27017/RentalDb');

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  console.log(customer);
  if (!customer) return res.status(400).send('Invalid customer');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie');


  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    // TODO Add your statement here
    const myrental = await Rental.findOne({ "customer._id": customer._id, "movie._id": movie._id });
    if (!myrental) {
      let rental = new Rental({
        customer: {
          _id: customer._id,
          name: customer.name,
          phone: customer.phone,
          isGold: customer.isGold
        },
        movie: {
          _id: movie._id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate
        },
      });
      rental.save();
      movie.numberInStock--;
      movie.save();
      // movie.update('movies', { _id: movie._id }, {
      //   $inc: { numberInStock: -1 }
      // }, { allowDiskUse: true });
      // Commit the changes
      await session.commitTransaction();
      return res.status(201).send(rental);
    }else{
      return res.status(302).send('Already mapped in rental');
    }
  }
  catch (error) {
    // Rollback any changes made in the database
    await session.abortTransaction();

    // Rethrow the error
    return res.status(500).send('something went wrong' + error);
  } finally {
    // Ending the session
    session.endSession();
  }

});

module.exports = router;