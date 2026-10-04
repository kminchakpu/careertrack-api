const express = require("express");

const applicationsRoutes = require("./routes/applicationsRoutes");
const companiesRoutes = require("./routes/companiesRoutes");

const app = express();

app.use("/api/applications", applicationsRoutes);
app.use("/api/companies", companiesRoutes);

module.exports = app;