const db = require("../model");
const Op = db.Sequelize.Op;

// Create and Save a new Medewerker
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id_nummer) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Medewerker
  const medewerker = {
    id_nummer: req.body.id_nummer,
    functie_id: req.body.functie_id,
    datum_in_dienst_treding: req.body.datum_in_dienst_treding,
    datum_uit_dienst_treding: req.body.datum_uit_dienst_treding,
    ingevoerd_door_persoons_gegevens_id: req.body.ingevoerd_door_persoons_gegevens_id,
    gewijzigd_door_persoons_gegevens_id: req.body.gewijzigd_door_persoons_gegevens_id,
    datum_ingevoerd: new Date()
  };

  // Save Medewerker in the database
  db.medewerker.create(medewerker)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Medewerker."
      });
    });
};

// Retrieve all Medewerkers from the database.
exports.findAll = (req, res) => {
  db.medewerker.findAll({
    include: [
      {
        model: db.functies,
        as: 'functie'
      }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving medewerkers."
      });
    });
};
