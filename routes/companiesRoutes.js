const express = require("express");
const router = express.Router();
const companiesController = require("../controllers/companiesController");
const validation = require("../middleware/validMiddleware");

router.get(
  "/",
  //#swagger.tags=["Companies"]
  //#swagger.summary = "Get all companies"
  //#swagger.description = "Retrieves all companies stored in the database."
  companiesController.getAllCompanies
);

router.get(
  "/:id",
  //#swagger.tags=["Companies"]
  //#swagger.summary = "Get a company by ID"
  //#swagger.description = "Retrieves a single company using its MongoDB ID."
  companiesController.getCompanyById
);

router.post(
  "/",
  //#swagger.tags=["Companies"]
  //#swagger.summary = "Create a new company"
  //#swagger.description = "Creates a new company in the database."
  validation.saveCompany,
  companiesController.createCompany
);

router.put(
  "/:id",
  //#swagger.tags=["Companies"]
  //#swagger.summary = "Update a company"
  //#swagger.description = "Updates an existing company using its MongoDB ID."
  validation.saveCompany,
  companiesController.updateCompany
);

router.delete(
  "/:id",
  //#swagger.tags=["Companies"]
  //#swagger.summary = "Delete a company"
  //#swagger.description = "Deletes a company using its MongoDB ID."
  companiesController.deleteCompany
);

module.exports = router;