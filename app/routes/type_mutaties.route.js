/**
 * @swagger
 * components:
 *   schemas:
 *     TypeMutaties:
 *       type: object
 *       required:
 *         - omschrijving
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated id
 *         omschrijving:
 *           type: string
 *           description: Omschrijving van type mutatie
 *       example:
 *         omschrijving: "Aangemaakt"
 */

/**
 * @swagger
 * tags:
 *   name: TypeMutaties
 *   description: API voor beheer van type mutaties
 */

module.exports = app => {
  const typeMutaties = require("../controller/type_mutaties.controller.js");

  var router = require("express").Router();

  /**
   * @swagger
   * /api/type-mutaties:
   *   post:
   *     summary: Maak nieuw type mutatie aan
   *     tags: [TypeMutaties]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/TypeMutaties'
   *     responses:
   *       200:
   *         description: Type mutatie succesvol aangemaakt
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/TypeMutaties'
   *       400:
   *         description: Ongeldige invoer
   *       500:
   *         description: Server error
   */
  router.post("/", typeMutaties.create);

  /**
   * @swagger
   * /api/type-mutaties:
   *   get:
   *     summary: Haal alle type mutaties op
   *     tags: [TypeMutaties]
   *     responses:
   *       200:
   *         description: Lijst van type mutaties
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/TypeMutaties'
   *       500:
   *         description: Server error
   */
  router.get("/", typeMutaties.findAll);

  app.use('/api/type-mutaties', router);
};
