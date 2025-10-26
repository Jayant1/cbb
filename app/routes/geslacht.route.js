/**
 * @swagger
 * components:
 *   schemas:
 *     Geslacht:
 *       type: object
 *       required:
 *         - omschrijving
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated id
 *         omschrijving:
 *           type: string
 *           description: Omschrijving van geslacht
 *       example:
 *         omschrijving: "Man"
 */

/**
 * @swagger
 * tags:
 *   name: Geslacht
 *   description: API voor beheer van geslacht
 */

module.exports = app => {
  const geslacht = require("../controller/geslacht.controller.js");

  var router = require("express").Router();

  /**
   * @swagger
   * /api/geslacht:
   *   post:
   *     summary: Maak nieuw geslacht aan
   *     tags: [Geslacht]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Geslacht'
   *     responses:
   *       200:
   *         description: Geslacht succesvol aangemaakt
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Geslacht'
   *       400:
   *         description: Ongeldige invoer
   *       500:
   *         description: Server error
   */
  router.post("/", geslacht.create);

  /**
   * @swagger
   * /api/geslacht:
   *   get:
   *     summary: Haal alle geslachten op
   *     tags: [Geslacht]
   *     responses:
   *       200:
   *         description: Lijst van geslachten
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Geslacht'
   *       500:
   *         description: Server error
   */
  router.get("/", geslacht.findAll);

  app.use('/api/geslacht', router);
};
