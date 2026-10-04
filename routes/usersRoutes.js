const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get(
  "/",
  //#swagger.tags=["Users"]
  //#swagger.summary = "Get all users"
  //#swagger.description = "Retrieves all users stored in the database."
  usersController.getAllUsers
);

router.get(
  "/:id",
  //#swagger.tags=["Users"]
  //#swagger.summary = "Get a user by ID"
  //#swagger.description = "Retrieves a single user using its MongoDB ID."
  usersController.getUserById
);

router.post(
  "/",
  //#swagger.tags=["Users"]
  //#swagger.summary = "Create a new user"
  //#swagger.description = "Creates a new user in the database."
  usersController.createUser
);

router.put(
  "/:id",
  //#swagger.tags=["Users"]
  //#swagger.summary = "Update a user"
  //#swagger.description = "Updates an existing user using its MongoDB ID."
  usersController.updateUser
);

router.delete(
  "/:id",
  //#swagger.tags=["Users"]
  //#swagger.summary = "Delete a user"
  //#swagger.description = "Deletes a user using its MongoDB ID."
  usersController.deleteUser
);

module.exports = router;