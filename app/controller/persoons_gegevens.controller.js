const db = require("../model");
const Op = db.Sequelize.Op;

// Create and Save a new PersoonsGegevens
exports.create = (req, res) => {
  // Validate request
  if (!req.body.naam) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a PersoonsGegevens
  const persoonsGegevens = {
    naam: req.body.naam,
    voornamen: req.body.voornamen,
    geboorte_datum: req.body.geboorte_datum,
    geboorte_tijd: req.body.geboorte_tijd,
    geslacht: req.body.geslacht,
    ingevoerd_door: req.body.ingevoerd_door,
    gewijzigd_door: req.body.gewijzigd_door,
    datum_ingevoerd: new Date()
  };

  // Save PersoonsGegevens in the database
  db.persoons_gegevens.create(persoonsGegevens)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PersoonsGegevens."
      });
    });
};

// Retrieve all PersoonsGegevens from the database.
exports.findAll = (req, res) => {

  db.persoons_gegevens.findAll(
    { 
      where: {
        naam:{
          [Op.like]: `%${req.query.naam}%`
        }
      } 

    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving persoons gegevens."
      });
    });
};

// Find a single PersoonsGegevens with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  db.persoons_gegevens.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find PersoonsGegevens with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving PersoonsGegevens with id=" + id
      });
    });
};

// Update a PersoonsGegevens by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  // Set datum_gewijzigd to current date
  req.body.datum_gewijzigd = new Date();

  db.persoons_gegevens.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "PersoonsGegevens was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update PersoonsGegevens with id=${id}. Maybe PersoonsGegevens was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating PersoonsGegevens with id=" + id
      });
    });
};

// Delete a PersoonsGegevens with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  db.persoons_gegevens.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "PersoonsGegevens was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete PersoonsGegevens with id=${id}. Maybe PersoonsGegevens was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete PersoonsGegevens with id=" + id
      });
    });
};

// Delete all PersoonsGegevens from the database.
exports.deleteAll = (req, res) => {
  db.persoons_gegevens.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} PersoonsGegevens were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all persoons gegevens."
      });
    });
};