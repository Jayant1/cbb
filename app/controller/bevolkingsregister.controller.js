const db = require("../model/index.js");

const Persoon = db.personen;
const Landen = db.landen;
const Nationaliteiten = db.nationaliteiten;
const Verblijf = db.verblijven;
const Adres = db.adressen;
const Wijken = db.wijken;
const Distrikten = db.distrikten;
const Document = db.documenten;
const NationaliteitHistorie = db.nationaliteit_historie;
const BurgerlijkeStaatHistorie = db.burgerlijke_staat_historie;

exports.opvragenGegevensUitBevolkingsregister = async (req, res) => {
  try {
    const { identificatienummer } = req.query;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const persoon = await Persoon.findOne({
      where: { identificatienummer },
      attributes: ['identificatienummer', 'geslacht', 'achternaam', 'voornamen', 'geboortedatum', 'geboorteplaats', 'burgerlijke_staat'],
      include: [
        {
          model: Verblijf,
          as: 'verblijven',
          where: { is_actief: true },
          required: false,
          attributes: ['inschrijvingsdatum'],
          include: [
            {
              model: Adres,
              as: 'adres',
              attributes: ['straatnaam'],
              include: [
                {
                  model: Wijken,
                  as: 'wijk',
                  attributes: ['wijknaam']
                },
                {
                  model: Distrikten,
                  as: 'distrikt',
                  attributes: ['distriktnaam']
                }
              ]
            }
          ]
        }
      ]
    });

    if (!persoon) {
      return res.status(404).json({
        success: false,
        message: "Persoon niet gevonden"
      });
    }

    const verblijf = persoon.verblijven && persoon.verblijven[0];

    return res.status(200).json({
      success: true,
      data: {
        identiteitsnummer:   persoon.identificatienummer,
        geslacht:            persoon.geslacht,
        geslachtsnaam:       persoon.achternaam,
        voornamen:           persoon.voornamen,
        geboortedatum:       persoon.geboortedatum,
        geboorteplaats:      persoon.geboorteplaats,
        burgerlijke_staat:   persoon.burgerlijke_staat,
        adres:               verblijf ? verblijf.adres.straatnaam : null,
        ressort:             verblijf ? verblijf.adres.wijk.wijknaam : null,
        distrikt:            verblijf ? verblijf.adres.distrikt.distriktnaam : null,
        registratiedatum:    verblijf ? verblijf.inschrijvingsdatum : null
      }
    });

  } catch (error) {
    console.error("Error ophalen gegevens:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van gegevens uit bevolkingsregister",
      error: error.message
    });
  }
};
