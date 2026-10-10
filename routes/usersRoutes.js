const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const validation = require("../middleware/validMiddleware");
const {
  ensureAuthenticated,
} = require("../middleware/authMiddleware");

router.get(
  "/",
  /*
    #swagger.tags = ["Users"]
    #swagger.summary = "Get all users"
    #swagger.description = "Retrieves all users stored in the database."

    #swagger.responses[200] = {
      description: "Users retrieved successfully"
    }

    #swagger.responses[500] = {
      description: "Failed to retrieve users"
    }
  */
  usersController.getAllUsers
);

router.get(
  "/:id",
  /*
    #swagger.tags = ["Users"]
    #swagger.summary = "Get a user by ID"
    #swagger.description = "Retrieves a single user using its MongoDB ID."

    #swagger.parameters["id"] = {
      in: "path",
      description: "User ID",
      required: true,
      schema: {
        type: "string"
      }
    }

    #swagger.responses[200] = {
      description: "User retrieved successfully"
    }

    #swagger.responses[400] = {
      description: "Invalid user ID"
    }

    #swagger.responses[404] = {
      description: "User not found"
    }

    #swagger.responses[500] = {
      description: "Failed to retrieve user"
    }
  */
  usersController.getUserById
);

router.post(
  "/",
  /*
    #swagger.tags = ["Users"]
    #swagger.summary = "Create a new user"
    #swagger.description = "Creates a new user in the database. Authentication is required."

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: [
              "authId",
              "name",
              "email",
              "role"
            ],
            properties: {
              authId: {
                type: "string"
              },
              name: {
                type: "string"
              },
              email: {
                type: "string",
                format: "email"
              },
              role: {
                type: "string"
              }
            }
          },
          example: {
            authId: "google-1029384756",
            name: "Daniel Okafor",
            email: "daniel.okafor@example.com",
            role: "user"
          }
        }
      }
    }

    #swagger.responses[201] = {
      description: "User created successfully"
    }

    #swagger.responses[401] = {
      description: "Authentication required"
    }

    #swagger.responses[412] = {
      description: "Validation failed"
    }

    #swagger.responses[500] = {
      description: "Failed to create user"
    }
  */
  ensureAuthenticated,
  validation.saveUser,
  usersController.createUser
);

router.put(
  "/:id",
  /*
    #swagger.tags = ["Users"]
    #swagger.summary = "Update a user"
    #swagger.description = "Updates an existing user using its MongoDB ID. Authentication is required."

    #swagger.parameters["id"] = {
      in: "path",
      description: "User ID",
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
              "authId",
              "name",
              "email",
              "role"
            ],
            properties: {
              authId: {
                type: "string"
              },
              name: {
                type: "string"
              },
              email: {
                type: "string",
                format: "email"
              },
              role: {
                type: "string"
              }
            }
          },
          example: {
            authId: "google-1029384756",
            name: "Daniel Okafor",
            email: "daniel.okafor@example.com",
            role: "admin"
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: "User updated successfully"
    }

    #swagger.responses[400] = {
      description: "Invalid user ID"
    }

    #swagger.responses[401] = {
      description: "Authentication required"
    }

    #swagger.responses[404] = {
      description: "User not found"
    }

    #swagger.responses[412] = {
      description: "Validation failed"
    }

    #swagger.responses[500] = {
      description: "Failed to update user"
    }
  */
  ensureAuthenticated,
  validation.saveUser,
  usersController.updateUser
);

router.delete(
  "/:id",
  /*
    #swagger.tags = ["Users"]
    #swagger.summary = "Delete a user"
    #swagger.description = "Deletes a user using its MongoDB ID. Authentication is required."

    #swagger.parameters["id"] = {
      in: "path",
      description: "User ID",
      required: true,
      schema: {
        type: "string"
      }
    }

    #swagger.responses[200] = {
      description: "User deleted successfully"
    }

    #swagger.responses[400] = {
      description: "Invalid user ID"
    }

    #swagger.responses[401] = {
      description: "Authentication required"
    }

    #swagger.responses[404] = {
      description: "User not found"
    }

    #swagger.responses[500] = {
      description: "Failed to delete user"
    }
  */
  ensureAuthenticated,
  usersController.deleteUser
);

module.exports = router;