const express = require("express");
const router = express.Router();
const applicationsController = require("../controllers/applicationsController");
const {
  applicationValidationRules,
  validate,
} = require("../middleware/validation");

router.get(
  "/",
  /*
    #swagger.tags = ["Applications"]
    #swagger.summary = "Get all applications"
    #swagger.description = "Retrieve all job applications."

    #swagger.responses[200] = {
      description: "Applications retrieved successfully"
    }

    #swagger.responses[500] = {
      description: "Failed to retrieve applications"
    }
  */
  applicationsController.getAllApplications
);

router.get(
  "/:id",
  /*
    #swagger.tags = ["Applications"]
    #swagger.summary = "Get application by ID"
    #swagger.description = "Retrieve a single job application by its ID."

    #swagger.parameters["id"] = {
      in: "path",
      description: "Application ID",
      required: true,
      type: "string"
    }

    #swagger.responses[200] = {
      description: "Application retrieved successfully"
    }

    #swagger.responses[400] = {
      description: "Invalid application ID"
    }

    #swagger.responses[404] = {
      description: "Application not found"
    }

    #swagger.responses[500] = {
      description: "Failed to retrieve application"
    }
  */
  applicationsController.getApplicationById
);

router.post(
  "/",
  /*
    #swagger.tags = ["Applications"]
    #swagger.summary = "Create a new application"
    #swagger.description = "Create a new job application."

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: [
              "companyId",
              "jobTitle",
              "location",
              "applicationDate",
              "status",
              "jobType"
            ],
            properties: {
              companyId: {
                type: "string",
                example: "68de22222222222222222221"
              },
              jobTitle: {
                type: "string",
                example: "Node.js Backend Developer"
              },
              location: {
                type: "string",
                example: "Lagos, Nigeria"
              },
              applicationDate: {
                type: "string",
                format: "date",
                example: "2026-10-01"
              },
              status: {
                type: "string",
                enum: [
                  "Applied",
                  "Screening",
                  "Interview",
                  "Offer",
                  "Rejected",
                  "Withdrawn"
                ],
                example: "Applied"
              },
              jobType: {
                type: "string",
                enum: [
                  "Full-time",
                  "Part-time",
                  "Contract",
                  "Internship",
                  "Remote"
                ],
                example: "Full-time"
              },
              salaryRange: {
                type: "string",
                example: "NGN 700,000 - 1,000,000 monthly"
              },
              jobUrl: {
                type: "string",
                example: "https://example.com/jobs/backend"
              },
              notes: {
                type: "string",
                example: "Applied through the company website."
              }
            }
          }
        }
      }
    }

    #swagger.responses[201] = {
      description: "Application created successfully"
    }

    #swagger.responses[400] = {
      description: "Validation failed"
    }

    #swagger.responses[500] = {
      description: "Failed to create application"
    }
  */
  applicationValidationRules,
  validate,
  applicationsController.createApplication
);

router.put(
  "/:id",
  /*
    #swagger.tags = ["Applications"]
    #swagger.summary = "Update an application"
    #swagger.description = "Update an existing job application by its ID."

    #swagger.parameters["id"] = {
      in: "path",
      description: "Application ID",
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
              "companyId",
              "jobTitle",
              "location",
              "applicationDate",
              "status",
              "jobType"
            ],
            properties: {
              companyId: {
                type: "string",
                example: "68de22222222222222222221"
              },
              jobTitle: {
                type: "string",
                example: "Senior Node.js Backend Developer"
              },
              location: {
                type: "string",
                example: "Lagos, Nigeria"
              },
              applicationDate: {
                type: "string",
                format: "date",
                example: "2026-10-01"
              },
              status: {
                type: "string",
                enum: [
                  "Applied",
                  "Screening",
                  "Interview",
                  "Offer",
                  "Rejected",
                  "Withdrawn"
                ],
                example: "Interview"
              },
              jobType: {
                type: "string",
                enum: [
                  "Full-time",
                  "Part-time",
                  "Contract",
                  "Internship",
                  "Remote"
                ],
                example: "Full-time"
              },
              salaryRange: {
                type: "string",
                example: "NGN 900,000 - 1,200,000 monthly"
              },
              jobUrl: {
                type: "string",
                example: "https://example.com/jobs/backend"
              },
              notes: {
                type: "string",
                example: "Interview scheduled."
              }
            }
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: "Application updated successfully"
    }

    #swagger.responses[400] = {
      description: "Invalid application ID or validation failed"
    }

    #swagger.responses[404] = {
      description: "Application not found"
    }

    #swagger.responses[500] = {
      description: "Failed to update application"
    }
  */
  applicationValidationRules,
  validate,
  applicationsController.updateApplication
);

router.delete(
  "/:id",
  /*
    #swagger.tags = ["Applications"]
    #swagger.summary = "Delete an application"
    #swagger.description = "Delete a job application by its ID."

    #swagger.parameters["id"] = {
      in: "path",
      description: "Application ID",
      required: true,
      type: "string"
    }

    #swagger.responses[200] = {
      description: "Application deleted successfully"
    }

    #swagger.responses[400] = {
      description: "Invalid application ID"
    }

    #swagger.responses[404] = {
      description: "Application not found"
    }

    #swagger.responses[500] = {
      description: "Failed to delete application"
    }
  */
  applicationsController.deleteApplication
);

module.exports = router;