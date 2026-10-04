const express = require("express");
const router = express.Router();
const interviewsController = require("../controllers/interviewsController");

router.get(
  "/",
  //#swagger.tags=["Interviews"]
  //#swagger.summary = "Get all interviews"
  //#swagger.description = "Retrieves all interviews stored in the database."
  interviewsController.getAllInterviews
);

router.get(
  "/:id",
  //#swagger.tags=["Interviews"]
  //#swagger.summary = "Get an interview by ID"
  //#swagger.description = "Retrieves a single interview using its MongoDB ID."
  interviewsController.getInterviewById
);

router.post(
  "/",
  //#swagger.tags=["Interviews"]
  //#swagger.summary = "Create a new interview"
  //#swagger.description = "Creates a new interview in the database."
  interviewsController.createInterview
);

router.put(
  "/:id",
  //#swagger.tags=["Interviews"]
  //#swagger.summary = "Update an interview"
  //#swagger.description = "Updates an existing interview using its MongoDB ID."
  interviewsController.updateInterview
);

router.delete(
  "/:id",
  //#swagger.tags=["Interviews"]
  //#swagger.summary = "Delete an interview"
  //#swagger.description = "Deletes an interview using its MongoDB ID."
  interviewsController.deleteInterview
);

module.exports = router;