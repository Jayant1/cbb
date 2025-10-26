/**
 * @swagger
 * components:
 *   schemas:
 *     Functies:
 *       type: object
 *       required:
 *         - omschrijving
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated id
 *         omschrijving:
 *           type: string
 *           description: Omschrijving van functie
 *       example:
 *         omschrijving: "Manager"
 */

/**
 * @swagger
 * tags:
 *   name: Functies
 *   description: API voor beheer van functies
 */

module.exports = app => {
  const functies = require("../controller/functies.controller.js");

  var router = require("express").Router();

  /**
   * @swagger
   * /api/functies:
   *   post:
   *     summary: Maak nieuwe functie aan
   *     tags: [Functies]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Functies'
   *     responses:
   *       200:
   *         description: Functie succesvol aangemaakt
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Functies'
   *       400:
   *         description: Ongeldige invoer
   *       500:
   *         description: Server error
   */
  router.post("/", functies.create);

  /**
   * @swagger
   * /api/functies:
   *   get:
   *     summary: Haal alle functies op
   *     tags: [Functies]
   *     responses:
   *       200:
   *         description: Lijst van functies
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Functies'
   *       500:
   *         description: Server error
   */
  router.get("/", functies.findAll);

  app.use('/api/functies', router);
};
