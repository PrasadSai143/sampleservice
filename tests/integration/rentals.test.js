const {Rental} = require('../../models/rental');
const request = require('supertest');
const mongoose = require('mongoose');

describe('/api/rentals', () => { 
   let server;
   let customerId;
   let movieId;
   let rental;
   beforeEach( async () => {
        server = require('../../index');
        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345',
                isGold: true
            },
            movie: {
                _id: movieId,
                title: 'movie name',
                dailyRentalRate: 2,
            }
        });
        await rental.save();
   });

   afterEach(async () => {
      server.close();
      await Rental.deleteMany();
   });

   it('should return 401 if client is not logged i!',async () => {
        const res = await request(server)
                    .post('/api/rentals')
                    .send({customerId: customerId, movieId: movieId
        });

        expect(res.status).toBe(401);

   });


});