const db = require("../model");
const Medewerker = db.medewerkers;

checkDuplicateGebruikersNaam = (req, res, next) => {
  Medewerker.findOne({
    where: {
      gebruikers_naam: req.body.gebruikers_naam
    }
  }).then(medewerker => {
    if (medewerker) {
      res.status(400).send({
        message: "Gebruikersnaam is al in gebruik!"
      });
      return;
    }
    next();
  });
};

const verifySignUp = {
  checkDuplicateGebruikersNaam: checkDuplicateGebruikersNaam
};

module.exports = verifySignUp;
