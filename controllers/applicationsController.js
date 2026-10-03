const { getDatabase } = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const COLLECTION = 'applications';
const getCollection = () => getDatabase().collection(COLLECTION);

const buildApplication = (body) => ({
    userId: body.userId,
    companyId: body.companyId,
    jobTitle: body.jobTitle,
    location: body.location,
    applicationDate: body.applicationDate,
    status: body.status,
    jobType: body.jobType,
    salaryRange: body.salaryRange,
    jobUrl: body.jobUrl,
    notes: body.notes,
    createdAt: body.createdAt,
});

const getAllApplications = async (req, res) => {
    //#swagger.tags=['Applications']
    try {
        const applications = await getCollection().find().toArray();
        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getApplicationById = async (req, res) => {
    //#swagger.tags=['Applications']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid application id');
    }
    try {
        const application = await getCollection().findOne({ _id: new ObjectId(req.params.id) });
        if (!application) {
            return res.status(404).json('Application not found');
        }
        res.status(200).json(application);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createApplication = async (req, res) => {
    //#swagger.tags=['Applications']
    const { userId, companyId, jobTitle } = req.body;
    if (!userId || !companyId || !jobTitle) {
        return res.status(400).json({ message: 'userId, companyId, and jobTitle are required.' });
    }
    try {
        const response = await getCollection().insertOne(buildApplication(req.body));
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json('Some error occurred while creating the application');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateApplication = async (req, res) => {
    //#swagger.tags=['Applications']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid application id');
    }
    const { userId, companyId, jobTitle } = req.body;
    if (!userId || !companyId || !jobTitle) {
        return res.status(400).json({ message: 'userId, companyId, and jobTitle are required.' });
    }
    try {
        const response = await getCollection().replaceOne(
            { _id: new ObjectId(req.params.id) },
            buildApplication(req.body)
        );
        if (response.matchedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('Application not found');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteApplication = async (req, res) => {
    //#swagger.tags=['Applications']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid application id');
    }
    try {
        const response = await getCollection().deleteOne({ _id: new ObjectId(req.params.id) });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('Application not found');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
};