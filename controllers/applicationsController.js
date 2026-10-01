const { ObjectId } = require("mongodb");
const { getDatabase } = require("../db/connect");

const getAllApplications = async (req, res) => {
  try {
    const db = getDatabase();
    const applications = await db
      .collection("applications")
      .find()
      .toArray();

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error getting applications:", error);
    res.status(500).json({
      error: "Failed to retrieve applications",
    });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid application ID",
      });
    }

    const db = getDatabase();

    const application = await db.collection("applications").findOne({
      _id: new ObjectId(id),
    });

    if (!application) {
      return res.status(404).json({
        error: "Application not found",
      });
    }

    res.status(200).json(application);
  } catch (error) {
    console.error("Error getting application:", error);
    res.status(500).json({
      error: "Failed to retrieve application",
    });
  }
};

const createApplication = async (req, res) => {
  try {
    const {
      userId,
      companyId,
      jobTitle,
      location,
      applicationDate,
      status,
      jobType,
      salaryRange,
      jobUrl,
      notes,
    } = req.body;

    const newApplication = {
      userId: userId || null,
      companyId,
      jobTitle,
      location,
      applicationDate: new Date(applicationDate),
      status,
      jobType,
      salaryRange: salaryRange || "",
      jobUrl: jobUrl || "",
      notes: notes || "",
      createdAt: new Date(),
    };

    const db = getDatabase();

    const result = await db
      .collection("applications")
      .insertOne(newApplication);

    res.status(201).json({
      message: "Application created successfully",
      applicationId: result.insertedId,
      application: {
        _id: result.insertedId,
        ...newApplication,
      },
    });
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({
      error: "Failed to create application",
    });
  }
};

const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid application ID",
      });
    }

    const {
      userId,
      companyId,
      jobTitle,
      location,
      applicationDate,
      status,
      jobType,
      salaryRange,
      jobUrl,
      notes,
    } = req.body;

    const updatedApplication = {
      userId: userId || null,
      companyId,
      jobTitle,
      location,
      applicationDate: new Date(applicationDate),
      status,
      jobType,
      salaryRange: salaryRange || "",
      jobUrl: jobUrl || "",
      notes: notes || "",
      updatedAt: new Date(),
    };

    const db = getDatabase();

    const result = await db.collection("applications").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updatedApplication,
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Application not found",
      });
    }

    res.status(200).json({
      message: "Application updated successfully",
    });
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({
      error: "Failed to update application",
    });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid application ID",
      });
    }

    const db = getDatabase();

    const result = await db.collection("applications").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Application not found",
      });
    }

    res.status(200).json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({
      error: "Failed to delete application",
    });
  }
};

module.exports = {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
};