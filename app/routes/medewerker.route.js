/**
 * @swagger
 * components:
 *   schemas:
 *     Medewerker:
 *       type: object
 *       required:
 *         - id_nummer
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated id
 *         id_nummer:
 *           type: string
 *           description: Medewerker ID nummer
 *         functie_id:
 *           type: integer
 *           description: ID van functie
 *         datum_in_dienst_treding:
 *           type: string
 *           format: date
 *           description: Datum in dienst treding
 *         datum_uit_dienst_treding:
 *           type: string
 *           format: date
 *           description: Datum uit dienst treding
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
 *       example:
 *         id_nummer: "EMP001"
 *         functie_id: 1
 *         datum_in_dienst_treding: "2023-01-15"
 */

/**
 * @swagger
 * tags:
 *   name: Medewerker
 *   description: API voor beheer van medewerkers
 */

module.exports = app => {
  const medewerker = require("../controller/medewerker.controller.js");

  var router = require("express").Router();

  /**
   * @swagger
   * /api/medewerker:
   *   post:
   *     summary: Maak nieuwe medewerker aan
   *     tags: [Medewerker]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Medewerker'
   *     responses:
   *       200:
   *         description: Medewerker succesvol aangemaakt
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Medewerker'
   *       400:
   *         description: Ongeldige invoer
   *       500:
   *         description: Server error
   */
  router.post("/", medewerker.create);

  /**
   * @swagger
   * /api/medewerker:
   *   get:
   *     summary: Haal alle medewerkers op
   *     tags: [Medewerker]
   *     responses:
   *       200:
   *         description: Lijst van medewerkers
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Medewerker'
   *       500:
   *         description: Server error
   */
  router.get("/", medewerker.findAll);

  app.use('/api/medewerker', router);
};
