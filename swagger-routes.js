const express = require("express");

const applicationsRoutes = require("./routes/applicationsRoutes");
const companiesRoutes = require("./routes/companiesRoutes");
const interviewsRoutes = require("./routes/interviewsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use("/auth", authRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/companies", companiesRoutes);
app.use("/api/interviews", interviewsRoutes);
app.use("/api/users", usersRoutes);

module.exports = app;