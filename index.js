
const mongoose = require('mongoose');
const config = require('config');

const express = require('express');
var app = express();


if(!config.get('myapp_jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/RentalDb')
    .then(() => console.log('Connected to db'))
    .catch((err) => console.error('While connecting db getting error', err));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
 
const courses = require('./routes/courses');
const home = require('./routes/home');
const customers = require('./routes/customers');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

app.use('/', home);
app.use('/api/courses', courses);
app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})