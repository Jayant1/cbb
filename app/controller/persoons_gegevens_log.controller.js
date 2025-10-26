const db = require("../model");
const Op = db.Sequelize.Op;

// Create and Save a new PersoonsGegevensLog
exports.create = (req, res) => {
  // Validate request
  if (!req.body.persoons_gegevens_id) {
    res.status(400).send({
      message: "persoons_gegevens_id can not be empty!"
    });
    return;
  }

  // Create a PersoonsGegevensLog
  const persoonsGegevensLog = {
    opmerking: req.body.opmerking,
    persoons_gegevens_id: req.body.persoons_gegevens_id,
    ingevoerd_door_persoons_gegevens_id: req.body.ingevoerd_door_persoons_gegevens_id,
    datum_ingevoerd: new Date(),
    type_mutaties_id: req.body.type_mutaties_id
  };

  // Save PersoonsGegevensLog in the database
  db.persoons_gegevens_log.create(persoonsGegevensLog)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PersoonsGegevensLog."
      });
    });
};

// Retrieve all PersoonsGegevensLogs from the database.
exports.findAll = (req, res) => {
  db.persoons_gegevens_log.findAll({
    include: [
      {
        model: db.persoons_gegevens,
        as: 'persoons_gegevens'
      },
      {
        model: db.type_mutaties,
        as: 'type_mutatie'
      }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving persoons gegevens logs."
      });
    });
};
