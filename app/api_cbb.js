const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
   origin: "*",
   optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

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
        url: 'http://cbb-api.gov.sr:3000',
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
require("./routes/bevolkingsregister.route.js")(app);

const env = (process.env.NODE_ENV || "development").trim();
const hostname = process.env.HOST || "0.0.0.0";
const portnumber = process.env.PORT || 3000;
// set port, listen for requests

app.listen(portnumber, hostname, () => {
  console.log(`Server is running on port http://${hostname}:${portnumber}/, For documentation and testing http://${hostname}:${portnumber}/api/docs`);
});

module.exports = app;
