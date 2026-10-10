const express = require("express");
const router = express.Router();
const applicationsController = require("../controllers/applicationsController");
const { ensureAuthenticated } = require("../middleware/authMiddleware");

router.get("/", applicationsController.getAllApplications);
router.get("/:id", applicationsController.getApplicationById);
router.post("/", ensureAuthenticated, applicationsController.createApplication);
router.put("/:id", ensureAuthenticated, applicationsController.updateApplication);
router.delete("/:id", ensureAuthenticated, applicationsController.deleteApplication);

module.exports = router;