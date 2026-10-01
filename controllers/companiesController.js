const { ObjectId } = require("mongodb");
const { getDatabase } = require("../db/connect");

const getAllCompanies = async (req, res) => {
  try {
    const db = getDatabase();

    const companies = await db
      .collection("companies")
      .find()
      .toArray();

    res.status(200).json(companies);
  } catch (error) {
    console.error("Error getting companies:", error);
    res.status(500).json({
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

    const company = await db.collection("companies").findOne({
      _id: new ObjectId(id),
    });

    if (!company) {
      return res.status(404).json({
        error: "Company not found",
      });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error("Error getting company:", error);
    res.status(500).json({
      error: "Failed to retrieve company",
    });
  }
};

const createCompany = async (req, res) => {
  try {
    const {
      userId,
      name,
      industry,
      location,
      country,
      website,
      contactEmail,
      notes,
    } = req.body;

    const newCompany = {
      userId: userId || null,
      name,
      industry,
      location,
      country,
      website: website || "",
      contactEmail: contactEmail || "",
      notes: notes || "",
      createdAt: new Date(),
    };

    const db = getDatabase();

    const result = await db
      .collection("companies")
      .insertOne(newCompany);

    res.status(201).json({
      message: "Company created successfully",
      companyId: result.insertedId,
      company: {
        _id: result.insertedId,
        ...newCompany,
      },
    });
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({
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

    const {
      userId,
      name,
      industry,
      location,
      country,
      website,
      contactEmail,
      notes,
    } = req.body;

    const updatedCompany = {
      userId: userId || null,
      name,
      industry,
      location,
      country,
      website: website || "",
      contactEmail: contactEmail || "",
      notes: notes || "",
      updatedAt: new Date(),
    };

    const db = getDatabase();

    const result = await db.collection("companies").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updatedCompany,
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Company not found",
      });
    }

    res.status(200).json({
      message: "Company updated successfully",
    });
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({
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

    const result = await db.collection("companies").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Company not found",
      });
    }

    res.status(200).json({
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({
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
