const diagnostics = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  readFromFile('./db/diagnostics.json')
  .then((data) => res.json(JSON.parse(data)))
  .catch((err) => {
    console.error(err);
    res.status(500).json({ error: 'Error in getting diagnostics' });
  });
});


// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  console.log(req.body);

  const { errors } = req.body;

  if (errors) {
    const newError = {
      time: Date.now(),
      error_id: uuidv4(),
      errors,
    };

    readAndAppend(newError, './db/diagnostics.json');
    res.json(`Error logged successfully 🚀`);
  }
});

module.exports = diagnostics;
