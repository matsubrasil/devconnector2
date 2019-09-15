const express = require('express');
require('dotenv').config();
const moment = require('moment');
const pg = require('pg');
const DATATYPE_DATE = 1114;

pg.types.setTypeParser(DATATYPE_DATE, str => moment.utc(str).format());

// types.setTypeParser(DATATYPE_DATE, function(val) {
//   return val === null ? null : Date.parse(val);
// });

const rootRoutes = require('./routes');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).send({ message: 'API Running...' });
});

// routes
app.use('/api', rootRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
