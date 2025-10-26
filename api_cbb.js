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
const db = require("./app/model");
db.connection.sync();

// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CBB API application." });
});

// Import routes
require("./app/routes/persoons_gegevens.route.js")(app);
require("./app/routes/medewerker.route.js")(app);
require("./app/routes/persoons_gegevens_log.route.js")(app);
require("./app/routes/geslacht.route.js")(app);
require("./app/routes/burgerlijke_staat.route.js")(app);
require("./app/routes/functies.route.js")(app);
require("./app/routes/type_mutaties.route.js")(app);

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
