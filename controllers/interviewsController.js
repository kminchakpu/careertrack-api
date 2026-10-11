const { ObjectId } = require("mongodb");
const { getDatabase } = require("../db/connect");

const getAllInterviews = async (req, res) => {
  try {
    const db = getDatabase();

    const interviews = await db
      .collection("interviews")
      .find()
      .toArray();

    return res.status(200).json(interviews);
  } catch (error) {
    console.error("Error retrieving interviews:", error);

    return res.status(500).json({
      error: "Failed to retrieve interviews",
    });
  }
};

const getInterviewById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid interview ID",
      });
    }

    const db = getDatabase();

    const interview = await db
      .collection("interviews")
      .findOne({
        _id: new ObjectId(id),
      });

    if (!interview) {
      return res.status(404).json({
        error: "Interview not found",
      });
    }

    return res.status(200).json(interview);
  } catch (error) {
    console.error("Error retrieving interview:", error);

    return res.status(500).json({
      error: "Failed to retrieve interview",
    });
  }
};

const createInterview = async (req, res) => {
  try {
    const db = getDatabase();

    const interview = {
      userId: req.body.userId,
      applicationId: req.body.applicationId,
      interviewDate: req.body.interviewDate,
      interviewType: req.body.interviewType,
      interviewer: req.body.interviewer,
      location: req.body.location,
      status: req.body.status,
      notes: req.body.notes,
    };

    const result = await db
      .collection("interviews")
      .insertOne(interview);

    return res.status(201).json({
      message: "Interview created successfully",
      interviewId: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating interview:", error);

    return res.status(500).json({
      error: "Failed to create interview",
    });
  }
};

const updateInterview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid interview ID",
      });
    }

    const db = getDatabase();

    const interview = {
      userId: req.body.userId,
      applicationId: req.body.applicationId,
      interviewDate: req.body.interviewDate,
      interviewType: req.body.interviewType,
      interviewer: req.body.interviewer,
      location: req.body.location,
      status: req.body.status,
      notes: req.body.notes,
    };

    const result = await db
      .collection("interviews")
      .updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: interview,
        }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Interview not found",
      });
    }

    return res.status(200).json({
      message: "Interview updated successfully",
    });
  } catch (error) {
    console.error("Error updating interview:", error);

    return res.status(500).json({
      error: "Failed to update interview",
    });
  }
};

const deleteInterview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid interview ID",
      });
    }

    const db = getDatabase();

    const result = await db
      .collection("interviews")
      .deleteOne({
        _id: new ObjectId(id),
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Interview not found",
      });
    }

    return res.status(200).json({
      message: "Interview deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting interview:", error);

    return res.status(500).json({
      error: "Failed to delete interview",
    });
  }
};

module.exports = {
  getAllInterviews,
  getInterviewById,
  createInterview,
  updateInterview,
  deleteInterview,
};
