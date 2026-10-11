const { getDatabase } = require("../db/connect");
const { ObjectId } = require("mongodb");

const COLLECTION = "interviews";

const getCollection = () =>
  getDatabase().collection(COLLECTION);

const VALID_TYPES = [
  "Phone",
  "Technical",
  "Behavioral",
  "HR",
  "Final",
  "Other",
];

const VALID_STATUSES = [
  "Scheduled",
  "Completed",
  "Cancelled",
  "Rescheduled",
];

/*
  Interview document shape:
  {
    "userId": ObjectId,
    "applicationId": ObjectId,
    "interviewDate": "2026-09-25",
    "interviewType": "Technical",
    "interviewer": "Jane Smith",
    "location": "Online",
    "status": "Scheduled",
    "notes": "Prepare Node.js and MongoDB questions.",
    "createdAt": "2026-09-18T00:00:00.000Z"
  }
*/

// Returns an error message string,
// or null if the body is valid.
const validateInterview = (body) => {
  const {
    userId,
    applicationId,
    interviewDate,
    interviewType,
    status,
  } = body;

  if (
    !userId ||
    !applicationId ||
    !interviewDate
  ) {
    return (
      "userId, applicationId, and " +
      "interviewDate are required."
    );
  }

  if (
    !ObjectId.isValid(userId) ||
    !ObjectId.isValid(applicationId)
  ) {
    return (
      "userId and applicationId must be " +
      "valid ObjectIds."
    );
  }

  if (isNaN(Date.parse(interviewDate))) {
    return (
      "interviewDate must be a valid date " +
      "(e.g. 2026-09-25)."
    );
  }

  if (
    interviewType &&
    !VALID_TYPES.includes(interviewType)
  ) {
    return (
      "interviewType must be one of: " +
      `${VALID_TYPES.join(", ")}.`
    );
  }

  if (
    status &&
    !VALID_STATUSES.includes(status)
  ) {
    return (
      "status must be one of: " +
      `${VALID_STATUSES.join(", ")}.`
    );
  }

  return null;
};

// Builds the editable interview fields.
// createdAt is excluded so updates do not overwrite it.
const buildInterview = (body) => ({
  userId: new ObjectId(body.userId),
  applicationId: new ObjectId(
    body.applicationId
  ),
  interviewDate: body.interviewDate,
  interviewType: body.interviewType,
  interviewer: body.interviewer,
  location: body.location,
  status: body.status || "Scheduled",
  notes: body.notes,
});

const getAllInterviews = async (req, res) => {
  //#swagger.tags=['Interviews']

  try {
    const interviews = await getCollection()
      .find()
      .toArray();

    return res.status(200).json(interviews);
  } catch (error) {
    console.error(
      "Error retrieving interviews:",
      error
    );

    return res.status(500).json({
      error: "Failed to retrieve interviews",
    });
  }
};

const getInterviewById = async (req, res) => {
  //#swagger.tags=['Interviews']

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: "Must use a valid interview id.",
    });
  }

  try {
    const interview = await getCollection()
      .findOne({
        _id: new ObjectId(req.params.id),
      });

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found.",
      });
    }

    return res.status(200).json(interview);
  } catch (error) {
    console.error(
      "Error retrieving interview:",
      error
    );

    return res.status(500).json({
      error: "Failed to retrieve interview",
    });
  }
};

const createInterview = async (req, res) => {
  //#swagger.tags=['Interviews']

  const validationError =
    validateInterview(req.body);

  if (validationError) {
    return res.status(400).json({
      message: validationError,
    });
  }

  try {
    const interview = {
      ...buildInterview(req.body),
      createdAt: new Date().toISOString(),
    };

    const response = await getCollection()
      .insertOne(interview);

    if (!response.acknowledged) {
      return res.status(500).json({
        message:
          "Some error occurred while creating " +
          "the interview.",
      });
    }

    return res.status(201).json({
      id: response.insertedId,
    });
  } catch (error) {
    console.error(
      "Error creating interview:",
      error
    );

    return res.status(500).json({
      error: "Failed to create interview",
    });
  }
};

const updateInterview = async (req, res) => {
  //#swagger.tags=['Interviews']

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: "Must use a valid interview id.",
    });
  }

  const validationError =
    validateInterview(req.body);

  if (validationError) {
    return res.status(400).json({
      message: validationError,
    });
  }

  try {
    const response = await getCollection()
      .updateOne(
        {
          _id: new ObjectId(req.params.id),
        },
        {
          $set: buildInterview(req.body),
        }
      );

    if (response.matchedCount === 0) {
      return res.status(404).json({
        message: "Interview not found.",
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(
      "Error updating interview:",
      error
    );

    return res.status(500).json({
      error: "Failed to update interview",
    });
  }
};

const deleteInterview = async (req, res) => {
  //#swagger.tags=['Interviews']

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: "Must use a valid interview id.",
    });
  }

  try {
    const response = await getCollection()
      .deleteOne({
        _id: new ObjectId(req.params.id),
      });

    if (response.deletedCount === 0) {
      return res.status(404).json({
        message: "Interview not found.",
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(
      "Error deleting interview:",
      error
    );

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