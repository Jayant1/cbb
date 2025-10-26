/**
 * @swagger
 * components:
 *   schemas:
 *     PersoonsGegevens:
 *       type: object
 *       required:
 *         - naam
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated id
 *         naam:
 *           type: string
 *           description: Achternaam van de persoon
 *         voornamen:
 *           type: string
 *           description: Voornamen van de persoon
 *         geboorte_datum:
 *           type: string
 *           format: date
 *           description: Geboortedatum (YYYY-MM-DD)
 *         id_nummer:
 *           type: string
 *           description: ID nummer
 *         geboorte_tijd:
 *           type: string
 *           format: time
 *           description: Geboortetime (HH:MM:SS)
 *         ingevoerd_door_persoons_gegevens_id:
 *           type: integer
 *           description: ID van persoon die gegevens invoerde
 *         gewijzigd_door_persoons_gegevens_id:
 *           type: integer
 *           description: ID van persoon die gegevens wijzigde
 *         datum_ingevoerd:
 *           type: string
 *           format: date-time
 *           description: Datum en tijd van invoer
 *         datum_gewijzigd:
 *           type: string
 *           format: date-time
 *           description: Datum en tijd van laatste wijziging
 *         geslacht_id:
 *           type: integer
 *           description: ID van geslacht
 *         burgerlijke_staat_id:
 *           type: integer
 *           description: ID van burgerlijke staat
 *         datum_van_overlijden:
 *           type: string
 *           format: date
 *           description: Datum van overlijden
 *       example:
 *         naam: "Jansen"
 *         voornamen: "Jan Peter"
 *         geboorte_datum: "1990-05-15"
 *         id_nummer: "123456789"
 *         geboorte_tijd: "14:30:00"
 *         geslacht_id: 1
 *         burgerlijke_staat_id: 1
 */

/**
 * @swagger
 * tags:
 *   name: PersoonsGegevens
 *   description: API voor beheer van persoonsgegevens
 */

module.exports = app => {
  const persoonsGegevens = require("../controller/persoons_gegevens.controller.js");

  var router = require("express").Router();

  /**
   * @swagger
   * /api/persoons-gegevens:
   *   post:
   *     summary: Maak nieuwe persoonsgegevens aan
   *     tags: [PersoonsGegevens]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PersoonsGegevens'
   *     responses:
   *       200:
   *         description: Persoonsgegevens succesvol aangemaakt
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PersoonsGegevens'
   *       400:
   *         description: Ongeldige invoer
   *       500:
   *         description: Server error
   */
  router.post("/", persoonsGegevens.create);

  /**
   * @swagger
   * /api/persoons-gegevens:
   *   get:
   *     summary: Haal alle persoonsgegevens op
   *     tags: [PersoonsGegevens]
   *     parameters:
   *       - in: query
   *         name: naam
   *         schema:
   *           type: string
   *         description: Filter op achternaam
   *     responses:
   *       200:
   *         description: Lijst van persoonsgegevens
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/PersoonsGegevens'
   *       500:
   *         description: Server error
   */
  router.get("/", persoonsGegevens.findAll);

  app.use('/api/persoons-gegevens', router);
};