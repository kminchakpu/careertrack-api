const { ObjectId } = require("mongodb");
const { getDatabase } = require("../db/connect");

const getAllApplications = async (req, res) => {
  try {
    const db = getDatabase();

    const applications = await db
      .collection("applications")
      .find()
      .toArray();

    return res.status(200).json(applications);
  } catch (error) {
    console.error(
      "Error retrieving applications:",
      error
    );

    return res.status(500).json({
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

    const application = await db
      .collection("applications")
      .findOne({
        _id: new ObjectId(id),
      });

    if (!application) {
      return res.status(404).json({
        error: "Application not found",
      });
    }

    return res.status(200).json(application);
  } catch (error) {
    console.error(
      "Error retrieving application:",
      error
    );

    return res.status(500).json({
      error: "Failed to retrieve application",
    });
  }
};

const createApplication = async (req, res) => {
  try {
    const db = getDatabase();

    const application = {
      companyId: req.body.companyId,
      jobTitle: req.body.jobTitle,
      location: req.body.location,
      applicationDate: req.body.applicationDate,
      status: req.body.status,
      jobType: req.body.jobType,
      salaryRange: req.body.salaryRange,
      jobUrl: req.body.jobUrl,
      notes: req.body.notes,
    };

    const result = await db
      .collection("applications")
      .insertOne(application);

    return res.status(201).json({
      message: "Application created successfully",
      applicationId: result.insertedId,
    });
  } catch (error) {
    console.error(
      "Error creating application:",
      error
    );

    return res.status(500).json({
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

    const db = getDatabase();

    const application = {
      companyId: req.body.companyId,
      jobTitle: req.body.jobTitle,
      location: req.body.location,
      applicationDate: req.body.applicationDate,
      status: req.body.status,
      jobType: req.body.jobType,
      salaryRange: req.body.salaryRange,
      jobUrl: req.body.jobUrl,
      notes: req.body.notes,
    };

    const result = await db
      .collection("applications")
      .updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: application,
        }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Application not found",
      });
    }

    return res.status(200).json({
      message: "Application updated successfully",
    });
  } catch (error) {
    console.error(
      "Error updating application:",
      error
    );

    return res.status(500).json({
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

    const result = await db
      .collection("applications")
      .deleteOne({
        _id: new ObjectId(id),
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Application not found",
      });
    }

    return res.status(200).json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error(
      "Error deleting application:",
      error
    );

    return res.status(500).json({
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
