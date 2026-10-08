const express = require("express");
const router = express.Router();
const applicationsController = require("../controllers/applicationsController");
const {
  applicationValidationRules,
  validate,
} = require("../middleware/validation");
const {
  ensureAuthenticated,
} = require("../middleware/authMiddleware");

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
      schema: {
        type: "string"
      }
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
    #swagger.description = "Create a new job application. Authentication is required."

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
              userId: {
                type: "string"
              },
              companyId: {
                type: "string"
              },
              jobTitle: {
                type: "string"
              },
              location: {
                type: "string"
              },
              applicationDate: {
                type: "string",
                format: "date"
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
                ]
              },
              jobType: {
                type: "string",
                enum: [
                  "Full-time",
                  "Part-time",
                  "Contract",
                  "Internship",
                  "Remote"
                ]
              },
              salaryRange: {
                type: "string"
              },
              jobUrl: {
                type: "string",
                format: "uri"
              },
              notes: {
                type: "string"
              }
            }
          },
          example: {
            userId: "65f1a2b3c4d5e6f7a8b9c0d1",
            companyId: "65f1a2b3c4d5e6f7a8b9c0d2",
            jobTitle: "Fullstack Developer",
            location: "Abuja, Nigeria",
            applicationDate: "2026-10-06",
            status: "Applied",
            jobType: "Full-time",
            salaryRange: "NGN 900,000 - 1,300,000 monthly",
            jobUrl: "https://example.com/job",
            notes: "Application submitted successfully."
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

    #swagger.responses[401] = {
      description: "Authentication required"
    }

    #swagger.responses[500] = {
      description: "Failed to create application"
    }
  */
  ensureAuthenticated,
  applicationValidationRules,
  validate,
  applicationsController.createApplication
);

router.put(
  "/:id",
  /*
    #swagger.tags = ["Applications"]
    #swagger.summary = "Update an application"
    #swagger.description = "Update an existing job application by its ID. Authentication is required."

    #swagger.parameters["id"] = {
      in: "path",
      description: "Application ID",
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
              "companyId",
              "jobTitle",
              "location",
              "applicationDate",
              "status",
              "jobType"
            ],
            properties: {
              userId: {
                type: "string"
              },
              companyId: {
                type: "string"
              },
              jobTitle: {
                type: "string"
              },
              location: {
                type: "string"
              },
              applicationDate: {
                type: "string",
                format: "date"
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
                ]
              },
              jobType: {
                type: "string",
                enum: [
                  "Full-time",
                  "Part-time",
                  "Contract",
                  "Internship",
                  "Remote"
                ]
              },
              salaryRange: {
                type: "string"
              },
              jobUrl: {
                type: "string",
                format: "uri"
              },
              notes: {
                type: "string"
              }
            }
          },
          example: {
            userId: "65f1a2b3c4d5e6f7a8b9c0d1",
            companyId: "65f1a2b3c4d5e6f7a8b9c0d2",
            jobTitle: "Senior Fullstack Developer",
            location: "Abuja, Nigeria",
            applicationDate: "2026-10-06",
            status: "Interview",
            jobType: "Full-time",
            salaryRange: "NGN 1,000,000 - 1,500,000 monthly",
            jobUrl: "https://example.com/job",
            notes: "Interview has been scheduled."
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

    #swagger.responses[401] = {
      description: "Authentication required"
    }

    #swagger.responses[404] = {
      description: "Application not found"
    }

    #swagger.responses[500] = {
      description: "Failed to update application"
    }
  */
  ensureAuthenticated,
  applicationValidationRules,
  validate,
  applicationsController.updateApplication
);

router.delete(
  "/:id",
  /*
    #swagger.tags = ["Applications"]
    #swagger.summary = "Delete an application"
    #swagger.description = "Delete a job application by its ID. Authentication is required."

    #swagger.parameters["id"] = {
      in: "path",
      description: "Application ID",
      required: true,
      schema: {
        type: "string"
      }
    }

    #swagger.responses[200] = {
      description: "Application deleted successfully"
    }

    #swagger.responses[400] = {
      description: "Invalid application ID"
    }

    #swagger.responses[401] = {
      description: "Authentication required"
    }

    #swagger.responses[404] = {
      description: "Application not found"
    }

    #swagger.responses[500] = {
      description: "Failed to delete application"
    }
  */
  ensureAuthenticated,
  applicationsController.deleteApplication
);

module.exports = router;