const express = require("express");
const router = express.Router();
const validation = require("../middleware/validMiddleware");
const interviewsController = require("../controllers/interviewsController");
const {
  ensureAuthenticated,
} = require("../middleware/authMiddleware");

router.get(
  "/",
  /*
    #swagger.tags = ["Interviews"]
    #swagger.summary = "Get all interviews"
    #swagger.description = "Retrieves all interviews stored in the database."

    #swagger.responses[200] = {
      description: "Interviews retrieved successfully"
    }

    #swagger.responses[500] = {
      description: "Failed to retrieve interviews"
    }
  */
  interviewsController.getAllInterviews
);

router.get(
  "/:id",
  /*
    #swagger.tags = ["Interviews"]
    #swagger.summary = "Get an interview by ID"
    #swagger.description = "Retrieves a single interview using its MongoDB ID."

    #swagger.parameters["id"] = {
      in: "path",
      description: "Interview ID",
      required: true,
      schema: {
        type: "string"
      }
    }

    #swagger.responses[200] = {
      description: "Interview retrieved successfully"
    }

    #swagger.responses[400] = {
      description: "Invalid interview ID"
    }

    #swagger.responses[404] = {
      description: "Interview not found"
    }

    #swagger.responses[500] = {
      description: "Failed to retrieve interview"
    }
  */
  interviewsController.getInterviewById
);

router.post(
  "/",
  /*
    #swagger.tags = ["Interviews"]
    #swagger.summary = "Create a new interview"
    #swagger.description = "Creates a new interview in the database. Authentication is required."

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: [
              "userId",
              "applicationId",
              "interviewDate",
              "interviewType",
              "status"
            ],
            properties: {
              userId: {
                type: "string"
              },
              applicationId: {
                type: "string"
              },
              interviewDate: {
                type: "string",
                format: "date-time"
              },
              interviewType: {
                type: "string"
              },
              interviewer: {
                type: "string"
              },
              location: {
                type: "string"
              },
              status: {
                type: "string"
              },
              notes: {
                type: "string"
              }
            }
          },
          example: {
            userId: "65f1a2b3c4d5e6f7a8b9c0d1",
            applicationId: "68de11111111111111111111",
            interviewDate: "2026-10-15T10:00:00.000Z",
            interviewType: "Technical Interview",
            interviewer: "Sarah Johnson",
            location: "Abuja, Nigeria",
            status: "Scheduled",
            notes: "Prepare for JavaScript, Node.js, and MongoDB technical questions."
          }
        }
      }
    }

    #swagger.responses[201] = {
      description: "Interview created successfully"
    }

    #swagger.responses[401] = {
      description: "Authentication required"
    }

    #swagger.responses[412] = {
      description: "Validation failed"
    }

    #swagger.responses[500] = {
      description: "Failed to create interview"
    }
  */
  ensureAuthenticated,
  validation.saveInterview,
  interviewsController.createInterview
);

router.put(
  "/:id",
  /*
    #swagger.tags = ["Interviews"]
    #swagger.summary = "Update an interview"
    #swagger.description = "Updates an existing interview using its MongoDB ID. Authentication is required."

    #swagger.parameters["id"] = {
      in: "path",
      description: "Interview ID",
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
              "userId",
              "applicationId",
              "interviewDate",
              "interviewType",
              "status"
            ],
            properties: {
              userId: {
                type: "string"
              },
              applicationId: {
                type: "string"
              },
              interviewDate: {
                type: "string",
                format: "date-time"
              },
              interviewType: {
                type: "string"
              },
              interviewer: {
                type: "string"
              },
              location: {
                type: "string"
              },
              status: {
                type: "string"
              },
              notes: {
                type: "string"
              }
            }
          },
          example: {
            userId: "65f1a2b3c4d5e6f7a8b9c0d1",
            applicationId: "68de11111111111111111111",
            interviewDate: "2026-10-16T14:00:00.000Z",
            interviewType: "Final Interview",
            interviewer: "Sarah Johnson",
            location: "Abuja, Nigeria",
            status: "Rescheduled",
            notes: "Interview rescheduled to the afternoon."
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: "Interview updated successfully"
    }

    #swagger.responses[400] = {
      description: "Invalid interview ID"
    }

    #swagger.responses[401] = {
      description: "Authentication required"
    }

    #swagger.responses[404] = {
      description: "Interview not found"
    }

    #swagger.responses[412] = {
      description: "Validation failed"
    }

    #swagger.responses[500] = {
      description: "Failed to update interview"
    }
  */
  ensureAuthenticated,
  validation.saveInterview,
  interviewsController.updateInterview
);

router.delete(
  "/:id",
  /*
    #swagger.tags = ["Interviews"]
    #swagger.summary = "Delete an interview"
    #swagger.description = "Deletes an interview using its MongoDB ID. Authentication is required."

    #swagger.parameters["id"] = {
      in: "path",
      description: "Interview ID",
      required: true,
      schema: {
        type: "string"
      }
    }

    #swagger.responses[200] = {
      description: "Interview deleted successfully"
    }

    #swagger.responses[400] = {
      description: "Invalid interview ID"
    }

    #swagger.responses[401] = {
      description: "Authentication required"
    }

    #swagger.responses[404] = {
      description: "Interview not found"
    }

    #swagger.responses[500] = {
      description: "Failed to delete interview"
    }
  */
  ensureAuthenticated,
  interviewsController.deleteInterview
);

module.exports = router;