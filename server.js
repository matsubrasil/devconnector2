const express = require('express');
require('dotenv').config();

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
