const validator = require("../config/validate");

const saveCompany = (req, res, next) => {
    const validationRule = {
        companyId: "required|integer",
        userId: "required|integer",
        name: "required|string",
        industry: "required|string",
        location: "required|string",
        website: "required|url",
        contactEmail: "required|email",
        notes: "string",
        createdAt: "string"
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveCompany,
};