const swaggerAutogen = require("swagger-autogen")();
const doc = {
  info: {
    title: "CareerTrack API",
    description: "CSE 341 Final Project - Job Application Tracking API",
  },
  host: "localhost:8080",
  schemes: ["http"],
};
const outputFile = "./swagger-output.json";
// Point swagger-autogen at app.js (not the individual route files).
// app.js is where the routes are mounted with their prefixes
// (e.g. app.use("/api/interviews", interviewsRoutes)), so autogen
// follows each require() and documents the full paths like
// /api/interviews/{id}. Listing the route files directly made every
// route show up as "/" and "/{id}" and overwrite each other.
// const endpointsFiles = [
//   "./routes/applicationsRoutes.js",
//   "./routes/companiesRoutes.js",
//   "./routes/interviewsRoutes.js",
//   "./routes/usersRoutes.js",
//   "./routes/authRoutes.js",
// ];
const endpointsFiles = ["./app.js"];
swaggerAutogen(outputFile, endpointsFiles, doc);
