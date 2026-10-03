const { ObjectId } = require("mongodb");
const { getDatabase } = require("../db/connect");

const COLLECTION = "applications";

const getCollection = () => {
  return getDatabase().collection(COLLECTION);
};

const getAllApplications = async (req, res) => {
  //#swagger.tags=['Applications']
  try {
    const applications = await getCollection()
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
  //#swagger.tags=['Applications']
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid application ID",
      });
    }

    const application = await getCollection().findOne({
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
  //#swagger.tags=['Applications']
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

    if (!userId || !companyId || !jobTitle) {
      return res.status(400).json({
        error: "userId, companyId, and jobTitle are required",
      });
    }

    const newApplication = {
      userId,
      companyId,
      jobTitle,
      location: location || "",
      applicationDate: applicationDate
        ? new Date(applicationDate)
        : new Date(),
      status: status || "applied",
      jobType: jobType || "",
      salaryRange: salaryRange || "",
      jobUrl: jobUrl || "",
      notes: notes || "",
      createdAt: new Date(),
    };

    const result = await getCollection().insertOne(
      newApplication
    );

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
  //#swagger.tags=['Applications']
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

    if (!userId || !companyId || !jobTitle) {
      return res.status(400).json({
        error: "userId, companyId, and jobTitle are required",
      });
    }

    const updatedApplication = {
      userId,
      companyId,
      jobTitle,
      location: location || "",
      applicationDate: applicationDate
        ? new Date(applicationDate)
        : new Date(),
      status: status || "applied",
      jobType: jobType || "",
      salaryRange: salaryRange || "",
      jobUrl: jobUrl || "",
      notes: notes || "",
      updatedAt: new Date(),
    };

    const result = await getCollection().updateOne(
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

    const application = await getCollection().findOne({
      _id: new ObjectId(id),
    });

    res.status(200).json({
      message: "Application updated successfully",
      application,
    });
  } catch (error) {
    console.error("Error updating application:", error);

    res.status(500).json({
      error: "Failed to update application",
    });
  }
};

const deleteApplication = async (req, res) => {
  //#swagger.tags=['Applications']
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid application ID",
      });
    }

    const result = await getCollection().deleteOne({
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