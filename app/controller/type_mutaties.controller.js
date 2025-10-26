const db = require("../model");
const Op = db.Sequelize.Op;

// Create and Save a new TypeMutaties
exports.create = (req, res) => {
  // Validate request
  if (!req.body.omschrijving) {
    res.status(400).send({
      message: "Omschrijving can not be empty!"
    });
    return;
  }

  // Create a TypeMutaties
  const typeMutaties = {
    omschrijving: req.body.omschrijving
  };

  // Save TypeMutaties in the database
  db.type_mutaties.create(typeMutaties)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TypeMutaties."
      });
    });
};

// Retrieve all TypeMutaties from the database.
exports.findAll = (req, res) => {
  db.type_mutaties.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving type mutaties."
      });
    });
};
