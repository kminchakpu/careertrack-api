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
const endpointsFiles = [
  "./routes/applicationsRoutes.js",
  "./routes/companiesRoutes.js",
  "./routes/interviewsRoutes.js",
  "./routes/usersRoutes.js",
  "./routes/authRoutes.js",
];
swaggerAutogen(outputFile, endpointsFiles, doc);
