const jwt = require('jsonwebtoken');
const db = require('../model');
const Medewerker = db.medewerkers;
const config = require('../config/auth.config');

// Registreer een nieuwe medewerker
exports.signup = async (req, res) => {
  try {
    const medewerker = await Medewerker.create({
      id_nummer: req.body.id_nummer,
      gebruikers_naam: req.body.gebruikers_naam,
      wachtwoord: req.body.wachtwoord,
      functie_id: req.body.functie_id,
      datum_in_dienst_treding: req.body.datum_in_dienst_treding,
      ingevoerd_door_persoons_gegevens_id: req.body.ingevoerd_door_persoons_gegevens_id,
      datum_ingevoerd: new Date()
    });

    res.status(201).send({ message: "Medewerker succesvol geregistreerd!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Medewerker inloggen
exports.signin = async (req, res) => {
  try {
    const medewerker = await Medewerker.findOne({
      where: {
        gebruikers_naam: req.body.gebruikers_naam
      }
    });

    if (!medewerker) {
      return res.status(404).send({ message: "Medewerker niet gevonden." });
    }

    const passwordIsValid = await medewerker.validPassword(req.body.wachtwoord);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Ongeldig wachtwoord!"
      });
    }

    // Generate token
    const token = jwt.sign({ id: medewerker.id }, config.secret, {
      expiresIn: config.jwtExpiration
    });

    // Generate refresh token
    const refreshToken = jwt.sign({ id: medewerker.id }, config.secret, {
      expiresIn: config.jwtRefreshExpiration
    });

    res.status(200).send({
      id: medewerker.id,
      id_nummer: medewerker.id_nummer,
      gebruikers_naam: medewerker.gebruikers_naam,
      functie_id: medewerker.functie_id,
      accessToken: token,
      refreshToken: refreshToken
    });

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Refresh token
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).send({ message: "Geen refresh token opgegeven!" });
  }

  jwt.verify(refreshToken, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Niet geautoriseerd!"
      });
    }

    const newToken = jwt.sign({ id: decoded.id }, config.secret, {
      expiresIn: config.jwtExpiration
    });

    res.status(200).send({
      accessToken: newToken
    });
  });
};
