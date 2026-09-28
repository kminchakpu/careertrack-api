require("dotenv").config();
const app = require("./app");
const { connectDatabase } = require("./db/connect");
const PORT = process.env.PORT || 8080;
async function startServer() {
try {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`CareerTrack API running on port ${PORT}`);
    console.log(`Local API: http://localhost:${PORT}`);
    console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
  });
} catch (error) {
  console.error("Failed to start server:", error.message);
  process.exit(1);
}
}
startServer();