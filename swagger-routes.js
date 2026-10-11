const express = require("express");
const interviewsRoutes = require("./routes/interviewsRoutes");
const usersRoutes = require("./routes/usersRoutes");

const app = express();

app.use("/api/interviews", interviewsRoutes);
app.use("/api/users", usersRoutes);

module.exports = app;
