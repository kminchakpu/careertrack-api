const express = require("express");
const router = express.Router();
const companiesController = require("../controllers/companiesController");
const validation = require("../middleware/validMiddleware");
const {
  ensureAuthenticated,
} = require("../middleware/authMiddleware");

router.get(
  "/",
  /*
    #swagger.tags = ["Companies"]
    #swagger.summary = "Get all companies"
    #swagger.description = "Retrieves all companies stored in the database."

    #swagger.responses[200] = {
      description: "Companies retrieved successfully"
    }

    #swagger.responses[500] = {
      description: "Failed to retrieve companies"
    }
  */
  companiesController.getAllCompanies
);

router.get(
  "/:id",
  /*
    #swagger.tags = ["Companies"]
    #swagger.summary = "Get a company by ID"
    #swagger.description = "Retrieves a single company using its MongoDB ID."

    #swagger.parameters["id"] = {
      in: "path",
      description: "Company ID",
      required: true,
      schema: {
        type: "string"
      }
    }

    #swagger.responses[200] = {
      description: "Company retrieved successfully"
    }

    #swagger.responses[400] = {
      description: "Invalid company ID"
    }

    #swagger.responses[404] = {
      description: "Company not found"
    }

    #swagger.responses[500] = {
      description: "Failed to retrieve company"
    }
  */
  companiesController.getCompanyById
);

router.post(
  "/",
  /*
    #swagger.tags = ["Companies"]
    #swagger.summary = "Create a new company"
    #swagger.description = "Creates a new company in the database."

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: [
              "name",
              "industry",
              "location"
            ],
            properties: {
              userId: {
                type: "string"
              },
              name: {
                type: "string"
              },
              industry: {
                type: "string"
              },
              location: {
                type: "string"
              },
              website: {
                type: "string",
                format: "uri"
              },
              contactEmail: {
                type: "string",
                format: "email"
              },
              notes: {
                type: "string"
              }
            }
          },
          example: {
            userId: "65f1a2b3c4d5e6f7a8b9c0d1",
            name: "TechNova Solutions",
            industry: "Information Technology",
            location: "Abuja, Nigeria",
            website: "https://example.com",
            contactEmail: "careers@example.com",
            notes: "Technology company specializing in software development and cloud solutions."
          }
        }
      }
    }

    #swagger.responses[201] = {
      description: "Company created successfully"
    }

    #swagger.responses[400] = {
      description: "Validation failed"
    }

    #swagger.responses[401] = {
      description: "Authentication required"
    }

    #swagger.responses[500] = {
      description: "Failed to create company"
    }
  */
  ensureAuthenticated,
  validation.saveCompany,
  companiesController.createCompany
);

router.put(
  "/:id",
  /*
    #swagger.tags = ["Companies"]
    #swagger.summary = "Update a company"
    #swagger.description = "Updates an existing company using its MongoDB ID."

    #swagger.parameters["id"] = {
      in: "path",
      description: "Company ID",
      required: true,
      schema: {
        type: "string"
      }
    }

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: [
              "name",
              "industry",
              "location"
            ],
            properties: {
              userId: {
                type: "string"
              },
              name: {
                type: "string"
              },
              industry: {
                type: "string"
              },
              location: {
                type: "string"
              },
              website: {
                type: "string",
                format: "uri"
              },
              contactEmail: {
                type: "string",
                format: "email"
              },
              notes: {
                type: "string"
              }
            }
          },
          example: {
            userId: "65f1a2b3c4d5e6f7a8b9c0d1",
            name: "TechNova Solutions",
            industry: "Software and Cloud Services",
            location: "Abuja, Nigeria",
            website: "https://example.com",
            contactEmail: "jobs@example.com",
            notes: "Updated company information."
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: "Company updated successfully"
    }

    #swagger.responses[400] = {
      description: "Invalid company ID or validation failed"
    }

    #swagger.responses[401] = {
      description: "Authentication required"
    }

    #swagger.responses[404] = {
      description: "Company not found"
    }

    #swagger.responses[500] = {
      description: "Failed to update company"
    }
  */
  ensureAuthenticated,
  validation.saveCompany,
  companiesController.updateCompany
);

router.delete(
  "/:id",
  /*
    #swagger.tags = ["Companies"]
    #swagger.summary = "Delete a company"
    #swagger.description = "Deletes a company using its MongoDB ID."

    #swagger.parameters["id"] = {
      in: "path",
      description: "Company ID",
      required: true,
      schema: {
        type: "string"
      }
    }

    #swagger.responses[200] = {
      description: "Company deleted successfully"
    }

    #swagger.responses[400] = {
      description: "Invalid company ID"
    }

    #swagger.responses[401] = {
      description: "Authentication required"
    }

    #swagger.responses[404] = {
      description: "Company not found"
    }

    #swagger.responses[500] = {
      description: "Failed to delete company"
    }
  */
  ensureAuthenticated,
  companiesController.deleteCompany
);

module.exports = router;