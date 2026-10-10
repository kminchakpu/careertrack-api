const express = require("express");

const authRoutes = require("./routes/authRoutes");
const interviewsRoutes = require("./routes/interviewsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const applicationsRoutes = require("./routes/applicationsRoutes");
const companiesRoutes = require("./routes/companiesRoutes");

const app = express();

app.use("/auth", authRoutes);
app.use("/api/interviews", interviewsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/companies", companiesRoutes);

module.exports = app;