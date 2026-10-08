const validator = require("../config/validate");

const saveCompany = (req, res, next) => {
    const validationRule = {
        userId: "string",
        name: "required|string",
        industry: "required|string",
        location: "required|string",
        website: "url",
        contactEmail: "email",
        notes: "string"
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            return res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            });
        }
        next();
    });
};

const saveInterview = (req, res, next) => {
    const validationRule = {
        userId: "required|string",
        applicationId: "required|string",
        interviewDate: "required|string",
        interviewType: "required|string",
        interviewer: "string",
        location: "string",
        status: "required|string",
        notes: "string"
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            return res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            });
        }
        next();
    });
};

const saveUser = (req, res, next) => {
    const validationRule = {
        authId: "required|string",
        name: "required|string",
        email: "required|email",
        role: "required|string"
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            return res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            });
        }
        next();
    });
};

module.exports = {
    saveCompany,
    saveInterview,
    saveUser,
};