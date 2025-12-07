const { verifySignUp } = require("../middleware");
const controller = require("../controller/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * @swagger
   * /api/medewerkers/signup:
   *   post:
   *     summary: Registreer een nieuwe medewerker
   *     tags: [Authenticatie]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - gebruikers_naam
   *               - wachtwoord
   *             properties:
   *               id_nummer:
   *                 type: string
   *                 description: ID nummer van de medewerker
   *               gebruikers_naam:
   *                 type: string
   *                 description: Gebruikersnaam voor inloggen
   *               wachtwoord:
   *                 type: string
   *                 format: password
   *                 description: Wachtwoord voor inloggen
   *               functie_id:
   *                 type: integer
   *                 description: ID van de functie
   *               datum_in_dienst_treding:
   *                 type: string
   *                 format: date
   *                 description: Datum in dienst treding
   *               ingevoerd_door_persoons_gegevens_id:
   *                 type: integer
   *                 description: ID van persoon die gegevens invoerde
   *     responses:
   *       201:
   *         description: Medewerker succesvol geregistreerd
   *       400:
   *         description: Gebruikersnaam is al in gebruik
   *       500:
   *         description: Fout bij registreren medewerker
   */
  app.post(
    "/api/medewerkers/signup",
    [verifySignUp.checkDuplicateGebruikersNaam],
    controller.signup
  );

  /**
   * @swagger
   * /api/medewerkers/signin:
   *   post:
   *     summary: Medewerker inloggen
   *     tags: [Authenticatie]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - gebruikers_naam
   *               - wachtwoord
   *             properties:
   *               gebruikers_naam:
   *                 type: string
   *                 description: Gebruikersnaam
   *               wachtwoord:
   *                 type: string
   *                 format: password
   *                 description: Wachtwoord
   *     responses:
   *       200:
   *         description: Medewerker succesvol ingelogd
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 id_nummer:
   *                   type: string
   *                 gebruikers_naam:
   *                   type: string
   *                 functie_id:
   *                   type: integer
   *                 accessToken:
   *                   type: string
   *                 refreshToken:
   *                   type: string
   *       401:
   *         description: Ongeldig wachtwoord
   *       404:
   *         description: Medewerker niet gevonden
   */
  app.post("/api/medewerkers/signin", controller.signin);

  /**
   * @swagger
   * /api/medewerkers/refresh-token:
   *   post:
   *     summary: Vernieuw access token
   *     tags: [Authenticatie]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - refreshToken
   *             properties:
   *               refreshToken:
   *                 type: string
   *     responses:
   *       200:
   *         description: Nieuwe access token gegenereerd
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 accessToken:
   *                   type: string
   *       401:
   *         description: Niet geautoriseerd
   *       403:
   *         description: Geen refresh token opgegeven
   */
  app.post("/api/medewerkers/refresh-token", controller.refreshToken);
};
