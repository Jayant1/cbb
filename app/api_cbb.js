const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const path = require("path");
const os = require("os");

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
    servers: []
  },
  apis: [path.join(__dirname, 'routes', '*.js')] // Path to the API docs
};

// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CBB API application." });
});

// Import routes
require("./routes/bevolkingsregister.route.js")(app);

const env = (process.env.NODE_ENV || "development").trim();
const hostname = process.env.HOST || "localhost";
const portnumber = process.env.PORT || 3000;
const prod_hostname = os.hostname() + ".gov.sr";

// SSL configuratie
const sslKeyPath = process.env.SSL_KEY || '/etc/ssl/cbb/privkey.pem';
const sslCertPath = process.env.SSL_CERT || '/etc/ssl/cbb/fullchain.pem';

// Swagger server URL dynamisch op basis van omgeving
const isProduction = env === "production" || env === "sandbox";
swaggerOptions.definition.servers = [
  {
    url: isProduction
      ? `https://${prod_hostname}:${portnumber}`
      : `http://${hostname}:${portnumber}`,
    description: isProduction ? 'Productie omgeving' : 'Lokale ontwikkelomgeving'
  }
];
const swaggerSpecDynamic = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecDynamic));
app.get('/api/openapi.json', (req, res) => { res.json(swaggerSpecDynamic); });

if (env === "production" || env === "sandbox") {
  // HTTPS server voor productie
  try {
    const sslOptions = {
      key: fs.readFileSync(sslKeyPath),
      cert: fs.readFileSync(sslCertPath)
    };
    
    https.createServer(sslOptions, app).listen(portnumber, () => {
      console.log(`HTTPS Server is running on https://${prod_hostname}:${portnumber}/`);
      console.log(`API Documentation: https://${prod_hostname}:${portnumber}/api/docs`);
    });
  } catch (err) {
    console.error('SSL certificaat niet gevonden, start HTTP server:', err.message);
    app.listen(portnumber, () => {
      console.log(`HTTP Server is running on http://${prod_hostname}:${portnumber}/`);
    });
  }
} else {
  // HTTP server voor development
  app.listen(portnumber, hostname, () => {
    console.log(`Server is running on http://${hostname}:${portnumber}/, For documentation and testing http://${hostname}:${portnumber}/api/docs`);
  });
}

module.exports = app;
