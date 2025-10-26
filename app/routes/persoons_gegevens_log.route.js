/**
 * @swagger
 * components:
 *   schemas:
 *     PersoonsGegevensLog:
 *       type: object
 *       required:
 *         - persoons_gegevens_id
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated id
 *         opmerking:
 *           type: string
 *           description: Opmerking of notitie
 *         persoons_gegevens_id:
 *           type: integer
 *           description: ID van persoons gegevens record
 *         ingevoerd_door_persoons_gegevens_id:
 *           type: integer
 *           description: ID van persoon die log invoerde
 *         datum_ingevoerd:
 *           type: string
 *           format: date-time
 *           description: Datum en tijd van invoer
 *         type_mutaties_id:
 *           type: integer
 *           description: ID van type mutatie
 *       example:
 *         opmerking: "Gegevens aangepast"
 *         persoons_gegevens_id: 1
 *         ingevoerd_door_persoons_gegevens_id: 1
 *         type_mutaties_id: 1
 */

/**
 * @swagger
 * tags:
 *   name: PersoonsGegevensLog
 *   description: API voor beheer van persoons gegevens logs
 */

module.exports = app => {
  const persoonsGegevensLog = require("../controller/persoons_gegevens_log.controller.js");

  var router = require("express").Router();

  /**
   * @swagger
   * /api/persoons-gegevens-log:
   *   post:
   *     summary: Maak nieuwe persoons gegevens log aan
   *     tags: [PersoonsGegevensLog]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PersoonsGegevensLog'
   *     responses:
   *       200:
   *         description: Log succesvol aangemaakt
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PersoonsGegevensLog'
   *       400:
   *         description: Ongeldige invoer
   *       500:
   *         description: Server error
   */
  router.post("/", persoonsGegevensLog.create);

  /**
   * @swagger
   * /api/persoons-gegevens-log:
   *   get:
   *     summary: Haal alle persoons gegevens logs op
   *     tags: [PersoonsGegevensLog]
   *     responses:
   *       200:
   *         description: Lijst van logs
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/PersoonsGegevensLog'
   *       500:
   *         description: Server error
   */
  router.get("/", persoonsGegevensLog.findAll);

  app.use('/api/persoons-gegevens-log', router);
};
