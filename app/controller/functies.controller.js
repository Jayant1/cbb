const db = require("../model");
const Op = db.Sequelize.Op;

// Create and Save a new Functies
exports.create = (req, res) => {
  // Validate request
  if (!req.body.omschrijving) {
    res.status(400).send({
      message: "Omschrijving can not be empty!"
    });
    return;
  }

  // Create a Functies
  const functies = {
    omschrijving: req.body.omschrijving
  };

  // Save Functies in the database
  db.functies.create(functies)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Functies."
      });
    });
};

// Retrieve all Functies from the database.
exports.findAll = (req, res) => {
  db.functies.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving functies."
      });
    });
};
