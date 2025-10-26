const db = require("../model");
const Op = db.Sequelize.Op;

// Create and Save a new BurgerlijkeStaat
exports.create = (req, res) => {
  // Validate request
  if (!req.body.omschrijving) {
    res.status(400).send({
      message: "Omschrijving can not be empty!"
    });
    return;
  }

  // Create a BurgerlijkeStaat
  const burgerlijkeStaat = {
    omschrijving: req.body.omschrijving
  };

  // Save BurgerlijkeStaat in the database
  db.burgerlijke_staat.create(burgerlijkeStaat)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the BurgerlijkeStaat."
      });
    });
};

// Retrieve all BurgerlijkeStaat from the database.
exports.findAll = (req, res) => {
  db.burgerlijke_staat.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving burgerlijke staat."
      });
    });
};
