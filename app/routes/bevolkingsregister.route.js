/**
 * @swagger
 * components:
 *   schemas:
 *     Persoon:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         identificatienummer:
 *           type: string
 *         voornamen:
 *           type: string
 *         achternaam:
 *           type: string
 *         geboortedatum:
 *           type: string
 *           format: date
 *         geboorteplaats:
 *           type: string
 *         geslacht:
 *           type: string
 *           enum: [M, V, X]
 *         burgerlijke_staat:
 *           type: string
 *           enum: [ongehuwd, gehuwd, gescheiden, weduwe_weduwnaar, geregistreerd_partnerschap]
 *         overlijdensdatum:
 *           type: string
 *           format: date
 *         overlijdensplaats:
 *           type: string
 *         geboorteland:
 *           $ref: '#/components/schemas/Land'
 *         nationaliteit:
 *           $ref: '#/components/schemas/Nationaliteit'
 *         verblijven:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Verblijf'
 *         documenten:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Document'
 *     Land:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         land_code:
 *           type: string
 *         landnaam:
 *           type: string
 *     Nationaliteit:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nationaliteit_code:
 *           type: string
 *         nationaliteit_naam:
 *           type: string
 *     Verblijf:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         inschrijvingsdatum:
 *           type: string
 *           format: date
 *         uitschrijvingsdatum:
 *           type: string
 *           format: date
 *         verblijf_type:
 *           type: string
 *           enum: [hoofdverblijf, domicilie, bijadres]
 *         is_actief:
 *           type: boolean
 *         adres:
 *           $ref: '#/components/schemas/Adres'
 *     Adres:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         straatnaam:
 *           type: string
 *         huisnummer:
 *           type: string
 *         toevoeging:
 *           type: string
 *         adres_type:
 *           type: string
 *           enum: [hoofdverblijf, briefadres, historisch]
 *     Document:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         document_type:
 *           type: string
 *           enum: [identiteitskaart, paspoort, verblijfsvergunning, rijbewijs]
 *         document_nummer:
 *           type: string
 *         uitgiftedatum:
 *           type: string
 *           format: date
 *         vervaldatum:
 *           type: string
 *           format: date
 *         uitgevende_instantie:
 *           type: string
 */

const controller = require("../controller/bevolkingsregister.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * @swagger
   * /opvragen_gegevens_uit_bevolkingsregister:
   *   get:
   *     summary: Ophalen van persoonsgegevens uit het bevolkingsregister
   *     description: Haalt alle gegevens op van een persoon op basis van identificatienummer, inclusief adres, documenten, nationaliteit historie en burgerlijke staat historie
   *     tags: [Bevolkingsregister]
   *     parameters:
   *       - in: query
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de persoon
   *     responses:
   *       200:
   *         description: Persoonsgegevens succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   $ref: '#/components/schemas/Persoon'
   *       400:
   *         description: Identificatienummer is verplicht
   *       404:
   *         description: Persoon niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/opvragen_gegevens_uit_bevolkingsregister",
    controller.opvragenGegevensUitBevolkingsregister
  );
};
