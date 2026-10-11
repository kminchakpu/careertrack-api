const express = require("express");
const router = express.Router();
const interviewsController = require("../controllers/interviewsController");
const { ensureAuthenticated } = require("../middleware/authMiddleware");

router.get("/", interviewsController.getAllInterviews);
router.get("/:id", interviewsController.getInterviewById);
router.post("/", ensureAuthenticated, interviewsController.createInterview);
 router.put("/:id", ensureAuthenticated, interviewsController.updateInterview);
 router.delete("/:id", ensureAuthenticated, interviewsController.deleteInterview);
// router.post("/", interviewsController.createInterview);
// router.put("/:id", interviewsController.updateInterview);
router.delete("/:id", interviewsController.deleteInterview);
module.exports = router;