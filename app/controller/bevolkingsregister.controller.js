const db = require("../model/index.js");

const Persoon = db.persoon;
const Landen = db.landen;
const Nationaliteiten = db.nationaliteiten;
const Verblijf = db.verblijf;
const Adres = db.adres;
const Wijken = db.wijken;
const Distrikten = db.distrikten;
const Document = db.document;
const NationaliteitHistorie = db.nationaliteit_historie;
const BurgerlijkeStaatHistorie = db.burgerlijke_staat_historie;

exports.ophaalGegevensVanBevolkingsregister = async (req, res) => {
  try {
    const { identificatienummer } = req.params;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const persoon = await Persoon.findOne({
      where: { identificatienummer },
      include: [
        {
          model: Landen,
          as: 'geboorteland',
          attributes: ['id', 'land_code', 'landnaam']
        },
        {
          model: Nationaliteiten,
          as: 'nationaliteit',
          attributes: ['id', 'nationaliteit_code', 'nationaliteit_naam']
        },
        {
          model: Verblijf,
          as: 'verblijven',
          where: { is_actief: true },
          required: false,
          include: [
            {
              model: Adres,
              as: 'adres',
              include: [
                {
                  model: Wijken,
                  as: 'wijk',
                  attributes: ['id', 'wijk_code', 'wijknaam']
                },
                {
                  model: Distrikten,
                  as: 'distrikt',
                  attributes: ['id', 'distrikt_code', 'distriktnaam']
                },
                {
                  model: Landen,
                  as: 'land',
                  attributes: ['id', 'land_code', 'landnaam']
                }
              ]
            }
          ]
        },
        {
          model: Document,
          as: 'documenten',
          attributes: ['id', 'document_type', 'document_nummer', 'uitgiftedatum', 'vervaldatum', 'uitgevende_instantie']
        },
        {
          model: NationaliteitHistorie,
          as: 'nationaliteit_historie',
          include: [
            {
              model: Nationaliteiten,
              as: 'nationaliteit',
              attributes: ['id', 'nationaliteit_code', 'nationaliteit_naam']
            }
          ]
        },
        {
          model: BurgerlijkeStaatHistorie,
          as: 'burgerlijke_staat_historie'
        }
      ]
    });

    if (!persoon) {
      return res.status(404).json({
        success: false,
        message: "Persoon niet gevonden"
      });
    }

    return res.status(200).json({
      success: true,
      data: persoon
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
