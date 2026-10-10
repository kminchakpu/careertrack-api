const { body, validationResult } = require("express-validator");

const applicationValidationRules = [
  body("companyId")
    .notEmpty()
    .withMessage("Company ID is required"),
  body("jobTitle")
    .trim()
    .notEmpty()
    .withMessage("Job title is required"),
  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required"),
  body("applicationDate")
    .notEmpty()
    .withMessage("Application date is required")
    .isISO8601()
    .withMessage("Application date must be a valid date"),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn([
      "Applied",
      "Screening",
      "Interview",
      "Offer",
      "Rejected",
      "Withdrawn",
    ])
    .withMessage(
      "Status must be Applied, Screening, Interview, Offer, Rejected, or Withdrawn"
    ),
  body("jobType")
    .notEmpty()
    .withMessage("Job type is required")
    .isIn([
      "Full-time",
      "Part-time",
      "Contract",
      "Internship",
      "Remote",
    ])
    .withMessage(
      "Job type must be Full-time, Part-time, Contract, Internship, or Remote"
    ),
  body("salaryRange")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Salary range must be a string"),
  body("jobUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Job URL must be a valid URL"),
  body("notes")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Notes must be a string"),
];

const companyValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Company name is required"),
  body("industry")
    .trim()
    .notEmpty()
    .withMessage("Industry is required"),
  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required"),
  body("country")
    .trim()
    .notEmpty()
    .withMessage("Country is required"),
  body("website")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Website must be a valid URL"),
  body("contactEmail")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Contact email must be a valid email"),
  body("notes")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Notes must be a string"),
];

const interviewValidationRules = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required"),
  body("applicationId")
    .notEmpty()
    .withMessage("Application ID is required"),
  body("interviewDate")
    .notEmpty()
    .withMessage("Interview date is required")
    .isISO8601()
    .withMessage("Interview date must be a valid date"),
  body("interviewType")
    .trim()
    .notEmpty()
    .withMessage("Interview type is required"),
  body("interviewer")
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage("Interviewer must be a string"),
  body("location")
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage("Location must be a string"),
  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status is required")
    .isIn([
      "Scheduled",
      "Completed",
      "Cancelled",
      "Rescheduled",
    ])
    .withMessage(
      "Status must be Scheduled, Completed, Cancelled, or Rescheduled"
    ),
  body("notes")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Notes must be a string"),
];

const userValidationRules = [
  body("authId")
    .trim()
    .notEmpty()
    .withMessage("Authentication ID is required"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .normalizeEmail(),
  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .isIn([
      "user",
      "admin",
    ])
    .withMessage("Role must be user or admin"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Validation failed",
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  applicationValidationRules,
  companyValidationRules,
  interviewValidationRules,
  userValidationRules,
  validate,
};