const { ObjectId } = require("mongodb");
const { getDatabase } = require("../db/connect");

const getAllCompanies = async (req, res) => {
  try {
    const db = getDatabase();

    const companies = await db
      .collection("companies")
      .find()
      .toArray();

    return res.status(200).json(companies);
  } catch (error) {
    console.error("Error retrieving companies:", error);

    return res.status(500).json({
      error: "Failed to retrieve companies",
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid company ID",
      });
    }

    const db = getDatabase();

    const company = await db
      .collection("companies")
      .findOne({
        _id: new ObjectId(id),
      });

    if (!company) {
      return res.status(404).json({
        error: "Company not found",
      });
    }

    return res.status(200).json(company);
  } catch (error) {
    console.error("Error retrieving company:", error);

    return res.status(500).json({
      error: "Failed to retrieve company",
    });
  }
};

const createCompany = async (req, res) => {
  try {
    const db = getDatabase();

    const company = {
      userId: req.body.userId,
      name: req.body.name,
      industry: req.body.industry,
      location: req.body.location,
      website: req.body.website,
      contactEmail: req.body.contactEmail,
      notes: req.body.notes,
    };

    const result = await db
      .collection("companies")
      .insertOne(company);

    return res.status(201).json({
      message: "Company created successfully",
      companyId: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating company:", error);

    return res.status(500).json({
      error: "Failed to create company",
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid company ID",
      });
    }

    const db = getDatabase();

    const company = {
      userId: req.body.userId,
      name: req.body.name,
      industry: req.body.industry,
      location: req.body.location,
      website: req.body.website,
      contactEmail: req.body.contactEmail,
      notes: req.body.notes,
    };

    const result = await db
      .collection("companies")
      .updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: company,
        }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Company not found",
      });
    }

    return res.status(200).json({
      message: "Company updated successfully",
    });
  } catch (error) {
    console.error("Error updating company:", error);

    return res.status(500).json({
      error: "Failed to update company",
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid company ID",
      });
    }

    const db = getDatabase();

    const result = await db
      .collection("companies")
      .deleteOne({
        _id: new ObjectId(id),
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Company not found",
      });
    }

    return res.status(200).json({
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting company:", error);

    return res.status(500).json({
      error: "Failed to delete company",
    });
  }
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};