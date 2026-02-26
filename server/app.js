const express = require("express");
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Configuració de vistes
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Registrar parcials
hbs.registerPartials(path.join(__dirname, "views/partials"));

// Servir carpeta pública
app.use(express.static(path.join(__dirname, "../public")));

// Registrar helper lte
hbs.registerHelper("lte", function (a, b) {
  return a <= b;
});

// Llegir JSON
const siteData = require("./data/site.json");
const citiesData = require("./data/cities.json");
const countriesData = require("./data/countries.json");

// Ruta /
app.get("/", (req, res) => {
  res.render("index", siteData);
});

// Ruta /informe
app.get("/informe", (req, res) => {
  res.render("informe", {
    ...siteData,
    ...citiesData,
    ...countriesData
  });
});

app.listen(PORT, () => {
  console.log(`Servidor en marxa a http://localhost:${PORT}`);
});