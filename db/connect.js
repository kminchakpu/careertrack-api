const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
let database;
async function connectDatabase() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    database = client.db(process.env.DATABASE_NAME);
    console.log("Connected to MongoDB");
    return database;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
}
function getDatabase() {
  if (!database) {
    throw new Error("Database has not been initialized.");
  }
  return database;
}
module.exports = {
  connectDatabase,
  getDatabase,
};