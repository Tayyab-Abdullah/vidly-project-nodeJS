const mongoose = require('mongoose');
require('express-async-errors');
const winston = require('winston');
const config = require('config');
const error = require('./middleware/error');
const users = require('./routes/users');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

// if(!config.get('jwtPrivateKey')){
//   console.error("FATAL ERROR: jwtPrivateKey is not defined.");
//   process.exit(1);
// }

winston.add(winston.transports.File, { filename: 'logfile.log' });

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));