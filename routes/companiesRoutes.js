const express = require("express");
const router = express.Router();
const companiesController = require("../controllers/companiesController");
const {
  companyValidationRules,
  validate,
} = require("../middleware/validation");

router.get(
  "/",
  /*
    #swagger.tags = ["Companies"]
    #swagger.summary = "Get all companies"
    #swagger.description = "Retrieve all companies."

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
    #swagger.summary = "Get company by ID"
    #swagger.description = "Retrieve a single company by its ID."

    #swagger.parameters["id"] = {
      in: "path",
      description: "Company ID",
      required: true,
      type: "string"
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
    #swagger.description = "Create a new company in CareerTrack."

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
              name: {
                type: "string",
                example: "NaijaCloud Technologies"
              },
              industry: {
                type: "string",
                example: "Software and Cloud Computing"
              },
              location: {
                type: "string",
                example: "Lagos, Nigeria"
              },
              website: {
                type: "string",
                example: "https://example.com"
              },
              contactEmail: {
                type: "string",
                format: "email",
                example: "careers@example.com"
              },
              notes: {
                type: "string",
                example: "Technology company specializing in cloud services."
              }
            }
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

    #swagger.responses[500] = {
      description: "Failed to create company"
    }
  */
  companyValidationRules,
  validate,
  companiesController.createCompany
);

router.put(
  "/:id",
  /*
    #swagger.tags = ["Companies"]
    #swagger.summary = "Update a company"
    #swagger.description = "Update an existing company by its ID."

    #swagger.parameters["id"] = {
      in: "path",
      description: "Company ID",
      required: true,
      type: "string"
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
              name: {
                type: "string",
                example: "NaijaCloud Technologies"
              },
              industry: {
                type: "string",
                example: "Cloud Computing and Software Development"
              },
              location: {
                type: "string",
                example: "Lagos, Nigeria"
              },
              website: {
                type: "string",
                example: "https://example.com"
              },
              contactEmail: {
                type: "string",
                format: "email",
                example: "jobs@example.com"
              },
              notes: {
                type: "string",
                example: "Updated company information."
              }
            }
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

    #swagger.responses[404] = {
      description: "Company not found"
    }

    #swagger.responses[500] = {
      description: "Failed to update company"
    }
  */
  companyValidationRules,
  validate,
  companiesController.updateCompany
);

router.delete(
  "/:id",
  /*
    #swagger.tags = ["Companies"]
    #swagger.summary = "Delete a company"
    #swagger.description = "Delete a company by its ID."

    #swagger.parameters["id"] = {
      in: "path",
      description: "Company ID",
      required: true,
      type: "string"
    }

    #swagger.responses[200] = {
      description: "Company deleted successfully"
    }

    #swagger.responses[400] = {
      description: "Invalid company ID"
    }

    #swagger.responses[404] = {
      description: "Company not found"
    }

    #swagger.responses[500] = {
      description: "Failed to delete company"
    }
  */
  companiesController.deleteCompany
);

module.exports = router;