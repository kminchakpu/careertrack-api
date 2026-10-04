const express = require("express");

const applicationsRoutes = require("./routes/applicationsRoutes");
const companiesRoutes = require("./routes/companiesRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use("/auth", authRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/companies", companiesRoutes);

module.exports = app;