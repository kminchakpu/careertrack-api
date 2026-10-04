const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0",
});

const doc = {
  info: {
    title: "CareerTrack API",
    version: "1.0.0",
    description:
      "API documentation for managing job applications, companies, interviews, and users in CareerTrack.",
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Local Development Server",
    },
    {
      url: "https://careertrack-api-t7e8.onrender.com",
      description: "Render Production Server",
    },
  ],
  tags: [
    {
      name: "Authentication",
      description: "Endpoints for Google OAuth authentication",
    },
    {
      name: "Applications",
      description: "Endpoints for managing job applications",
    },
    {
      name: "Companies",
      description: "Endpoints for managing companies",
    },
    {
      name: "Interviews",
      description: "Endpoints for managing interviews",
    },
    {
      name: "Users",
      description: "Endpoints for managing users",
    },
  ],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./swagger-routes.js"];

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log(
      "Swagger documentation generated successfully."
    );
  })
  .catch((error) => {
    console.error(
      "Failed to generate Swagger documentation:",
      error
    );
    process.exit(1);
  });