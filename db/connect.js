const { MongoClient } = require("mongodb");

let database;
let client;

async function connectDatabase() {
  if (database) {
    return database;
  }

  const connectionString = process.env.MONGODB_URI;
  const databaseName = process.env.DATABASE_NAME;

  if (!connectionString) {
    throw new Error(
      "MONGODB_URI environment variable is not defined."
    );
  }

  if (!databaseName) {
    throw new Error(
      "DATABASE_NAME environment variable is not defined."
    );
  }

  try {
    client = new MongoClient(connectionString);

    await client.connect();

    database = client.db(databaseName);

    console.log(
      `Connected successfully to MongoDB database: ${databaseName}`
    );

    return database;
  } catch (error) {
    console.error(
      "Error connecting to MongoDB:",
      error.message
    );

    throw error;
  }
}

function getDatabase() {
  if (!database) {
    throw new Error(
      "Database has not been initialized. Call connectDatabase() first."
    );
  }

  return database;
}

async function closeDatabase() {
  if (client) {
    await client.close();
    client = null;
    database = null;

    console.log("MongoDB connection closed.");
  }
}

module.exports = {
  connectDatabase,
  getDatabase,
  closeDatabase,
};