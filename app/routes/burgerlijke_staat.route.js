/**
 * @swagger
 * components:
 *   schemas:
 *     BurgerlijkeStaat:
 *       type: object
 *       required:
 *         - omschrijving
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated id
 *         omschrijving:
 *           type: string
 *           description: Omschrijving van burgerlijke staat
 *       example:
 *         omschrijving: "Gehuwd"
 */

/**
 * @swagger
 * tags:
 *   name: BurgerlijkeStaat
 *   description: API voor beheer van burgerlijke staat
 */

module.exports = app => {
  const burgerlijkeStaat = require("../controller/burgerlijke_staat.controller.js");

  var router = require("express").Router();

  /**
   * @swagger
   * /api/burgerlijke_staat:
   *   post:
   *     summary: Maak nieuwe burgerlijke staat aan
   *     tags: [BurgerlijkeStaat]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/BurgerlijkeStaat'
   *     responses:
   *       200:
   *         description: Burgerlijke staat succesvol aangemaakt
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BurgerlijkeStaat'
   *       400:
   *         description: Ongeldige invoer
   *       500:
   *         description: Server error
   */
  router.post("/", burgerlijkeStaat.create);

  /**
   * @swagger
   * /api/burgerlijke_staat:
   *   get:
   *     summary: Haal alle burgerlijke staten op
   *     tags: [BurgerlijkeStaat]
   *     responses:
   *       200:
   *         description: Lijst van burgerlijke staten
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/BurgerlijkeStaat'
   *       500:
   *         description: Server error
   */
  router.get("/", burgerlijkeStaat.findAll);

  app.use('/api/burgerlijke_staat', router);  
};
