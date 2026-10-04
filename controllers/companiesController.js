const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllCompanies = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().collection("companies").find();
    result.toArray().then((companies) => {
      if (companies.length === 0) {
        return res.status(404).json({ message: "Database is empty" });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(companies)
    });
  } catch (error) {
    console.error("Error getting companies:", error);
    res.status(500).json({
      message: "Failed to retrieve companies",
      error: error.message
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("You must use a valid company id.");
    }
    const dbId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection("companies").find({ _id: dbId });
    result.toArray().then((companies) => {
      if (companies.length === 0) {
        return res.status(404).json({ message: "ID not found" });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(companies[0]);
    });

    if (!company) {
      return res.status(404).json({
        error: "Company not found",
      });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error("Error getting a company:", error);
    res.status(500).json({
      message: "Error getting a company",
      error: error.message
    });
  }
};

const createCompany = async (req, res) => {
  try {
    const {
      companyId, userId, name,
      industry, location, website,
      contactEmail, notes, createdAt
    } = req.body;
    const company = {
      companyId, userId, name,
      industry, location, website,
      contactEmail, notes, createdAt
    };
    if (!companyId || !userId || !name
      || !industry || !location || !website
      || !contactEmail || !notes || !createdAt) {
      return res.status(400).json({ message: "All fields are required." });
    };
    const response = await mongodb.getDatabase().collection("companies").insertOne(company);
    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json(response.error || "Some error ocurred while creating the company.");
    }
  } catch (error) {
    console.error("Error creating the company:", error);
    res.status(500).json({
      message: "Error creating the company",
      error: error.message
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("You must use a valid company id to update it.");
    }
    const dbId = new ObjectId(req.params.id);
    const {
      companyId, userId, name,
      industry, location, website,
      contactEmail, notes, createdAt
    } = req.body;
    const company = {
      companyId, userId, name,
      industry, location, website,
      contactEmail, notes, createdAt
    };
    if (!companyId || !userId || !name
      || !industry || !location || !website
      || !contactEmail || !notes || !createdAt) {
      return res.status(400).json({ message: "All fields are required." });
    };
    const response = await mongodb.getDatabase().collection("companies").replaceOne({ _id: dbId }, company);
    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "ID not found" });
    }
    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "Company updated" });
    } else {
      res.status(500).json(response.error || "Some error ocurred while updating the company.");
    }
  } catch (error) {
    console.error("Error updating the company:", error);
    res.status(500).json({
      message: "Error updating the company",
      error: error.message
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("You must use a valid company id to delete it.");
    }
    const dbId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().collection("companies").deleteOne({ _id: dbId });
    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "ID not found" });
    } else if (response.deletedCount > 0) {
      res.status(200).json({ message: "Company removed" });
    } else {
      res.status(500).json(response.error || "Some error ocurred while deleting the company.");
    };
  } catch (error) {
    console.error("Error deleting the company:", error);
    res.status(500).json({
      message: "Error deleting the company",
      error: error.message
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
