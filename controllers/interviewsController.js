const { getDatabase } = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const COLLECTION = 'interviews';
const getCollection = () => getDatabase().collection(COLLECTION);

const VALID_TYPES = ['Phone', 'Technical', 'Behavioral', 'HR', 'Final', 'Other'];
const VALID_STATUSES = ['Scheduled', 'Completed', 'Cancelled', 'Rescheduled'];

// Returns an error message string, or null if the body is valid.
const validateInterview = (body) => {
    const { userId, applicationId, interviewDate, interviewType, status } = body;

    if (!userId || !applicationId || !interviewDate) {
        return 'userId, applicationId, and interviewDate are required';
    }
    if (!ObjectId.isValid(userId) || !ObjectId.isValid(applicationId)) {
        return 'userId and applicationId must be valid ObjectIds';
    }
    if (isNaN(Date.parse(interviewDate))) {
        return 'interviewDate must be a valid date (e.g. 2026-09-25)';
    }
    if (interviewType && !VALID_TYPES.includes(interviewType)) {
        return `interviewType must be one of: ${VALID_TYPES.join(', ')}`;
    }
    if (status && !VALID_STATUSES.includes(status)) {
        return `status must be one of: ${VALID_STATUSES.join(', ')}`;
    }
    return null;
};

// Editable fields only (createdAt is set once on create, updatedAt on update).
const buildInterview = (body) => ({
    userId: new ObjectId(body.userId),
    applicationId: new ObjectId(body.applicationId),
    interviewDate: new Date(body.interviewDate),
    interviewType: body.interviewType,
    interviewer: body.interviewer,
    location: body.location,
    status: body.status || 'Scheduled',
    notes: body.notes,
});

const getAllInterviews = async (req, res) => {
    /*  #swagger.tags = ['Interviews']
        #swagger.description = 'Get all interviews'
    */
    try {
        const interviews = await getCollection().find().toArray();
        return res.status(200).json(interviews);
    } catch (error) {
        console.error('Error getting interviews:', error);
        return res.status(500).json({ error: 'Failed to retrieve interviews' });
    }
};

const getInterviewById =