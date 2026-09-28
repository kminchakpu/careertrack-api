const getAllApplications = async (req, res) => {
  res.status(200).json({
    message: "Get all applications",
  });
};
const getApplicationById = async (req, res) => {
  res.status(200).json({
    message: `Get application ${req.params.id}`,
  });
};
const createApplication = async (req, res) => {
  res.status(201).json({
    message: "Create application",
  });
};
const updateApplication = async (req, res) => {
  res.status(200).json({
    message: `Update application ${req.params.id}`,
  });
};
const deleteApplication = async (req, res) => {
  res.status(200).json({
    message: `Delete application ${req.params.id}`,
  });
};
module.exports = {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
};