const express = require("express");
const cors = require("cors");
const { verifyToken } = require("./utils/jwt.utils");

const app = express();

var corsOptions = {
   origin: "*",
   optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// JWT Secret Key (in production, use environment variable)
process.env.JWT_SECRET = "your-super-secret-key-1234567890";

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Database
const db = require("./model/index.js");
// db.connection.sync();

// Swagger setup
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CBB subsysteem(Centraal Bureau voor Burgerzaken)',
      version: '1.0.0',
      description: 'REST API voor beheer van persoonsgegevens in het bevolkingsregister',
      contact: {
        name: 'CBB Admin',
        email: 'admin@cbb.egov.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Sandbox omgeving'
      }
    ]
  },
  apis: ['./routes/*.js'] // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI endpoint
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CBB API application." });
});

// Import routes
require("./routes/auth.routes")(app);

// Apply JWT verification to all routes except medewerkers auth and docs
app.use((req, res, next) => {
  // Skip JWT verification for medewerkers auth routes and Swagger docs
  if (req.path.startsWith('/api/medewerkers/signin') || 
      req.path.startsWith('/api/medewerkers/signup') || 
      req.path.startsWith('/api/medewerkers/refresh-token') || 
      req.path.startsWith('/api/docs')) {
    return next();
  }
  verifyToken(req, res, next);
});

// Protected routes
require("./routes/persoons_gegevens.route.js")(app);
require("./routes/medewerkers.route.js")(app);
require("./routes/persoons_gegevens_log.route.js")(app);
require("./routes/geslacht.route.js")(app);
require("./routes/burgerlijke_staat.route.js")(app);
require("./routes/functies.route.js")(app);
require("./routes/type_mutaties.route.js")(app);

const env = process.env.NODE_ENV || "development";
const hostname = process.env.HOST || "localhost";
const portnumber = process.env.PORT || 3000;
// set port, listen for requests

if (env === "development") {
  app.listen(portnumber, hostname, () => {
  console.log(`Server is running on port http://${hostname}:${portnumber}/, For documentation and testing http://${hostname}:${portnumber}/api/docs`);
});
}

module.exports = app;
