const db = require("../model");
const Op = db.Sequelize.Op;

// Create and Save a new Geslacht
exports.create = (req, res) => {
  // Validate request
  if (!req.body.omschrijving) {
    res.status(400).send({
      message: "Omschrijving can not be empty!"
    });
    return;
  }

  // Create a Geslacht
  const geslacht = {
    omschrijving: req.body.omschrijving
  };

  // Save Geslacht in the database
  db.geslacht.create(geslacht)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Geslacht."
      });
    });
};

// Retrieve all Geslacht from the database.
exports.findAll = (req, res) => {
  db.geslacht.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving geslacht."
      });
    });
};
