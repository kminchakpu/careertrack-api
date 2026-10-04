function errorMiddleware(error, req, res, next) {
  console.error("Application error:", error);

  if (res.headersSent) {
    return next(error);
  }

  res.status(error.status || 500).json({
    error:
      error.message ||
      "An unexpected server error occurred",
  });
}

module.exports = errorMiddleware;