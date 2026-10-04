const mongodb = require("../db/connect");
const { ObjectId } = require("mongodb");

const getAllCompanies = async (req, res) => {
  try {
    const companies = await mongodb
      .getDatabase()
      .collection("companies")
      .find()
      .toArray();

    if (companies.length === 0) {
      return res.status(404).json({
        message: "Database is empty",
      });
    }

    res.status(200).json(companies);
  } catch (error) {
    console.error("Error getting companies:", error);

    res.status(500).json({
      message: "Failed to retrieve companies",
      error: error.message,
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "You must use a valid company id.",
      });
    }

    const company = await mongodb
      .getDatabase()
      .collection("companies")
      .findOne({
        _id: new ObjectId(id),
      });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error("Error getting a company:", error);

    res.status(500).json({
      message: "Error getting a company",
      error: error.message,
    });
  }
};

const createCompany = async (req, res) => {
  try {
    const {
      companyId,
      userId,
      name,
      industry,
      location,
      website,
      contactEmail,
      notes,
      createdAt,
    } = req.body;

    if (
      !companyId ||
      !userId ||
      !name ||
      !industry ||
      !location ||
      !website ||
      !contactEmail ||
      !notes ||
      !createdAt
    ) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const company = {
      companyId,
      userId,
      name,
      industry,
      location,
      website,
      contactEmail,
      notes,
      createdAt,
    };

    const response = await mongodb
      .getDatabase()
      .collection("companies")
      .insertOne(company);

    if (!response.acknowledged) {
      return res.status(500).json({
        message: "Some error occurred while creating the company.",
      });
    }

    res.status(201).json({
      message: "Company created successfully",
      id: response.insertedId,
    });
  } catch (error) {
    console.error("Error creating the company:", error);

    res.status(500).json({
      message: "Error creating the company",
      error: error.message,
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "You must use a valid company id to update it.",
      });
    }

    const {
      companyId,
      userId,
      name,
      industry,
      location,
      website,
      contactEmail,
      notes,
      createdAt,
    } = req.body;

    if (
      !companyId ||
      !userId ||
      !name ||
      !industry ||
      !location ||
      !website ||
      !contactEmail ||
      !notes ||
      !createdAt
    ) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const company = {
      companyId,
      userId,
      name,
      industry,
      location,
      website,
      contactEmail,
      notes,
      createdAt,
    };

    const response = await mongodb
      .getDatabase()
      .collection("companies")
      .replaceOne(
        {
          _id: new ObjectId(id),
        },
        company
      );

    if (response.matchedCount === 0) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.status(200).json({
      message: "Company updated successfully",
    });
  } catch (error) {
    console.error("Error updating the company:", error);

    res.status(500).json({
      message: "Error updating the company",
      error: error.message,
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "You must use a valid company id to delete it.",
      });
    }

    const response = await mongodb
      .getDatabase()
      .collection("companies")
      .deleteOne({
        _id: new ObjectId(id),
      });

    if (response.deletedCount === 0) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.status(200).json({
      message: "Company removed successfully",
    });
  } catch (error) {
    console.error("Error deleting the company:", error);

    res.status(500).json({
      message: "Error deleting the company",
      error: error.message,
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