const { ObjectId } = require("mongodb");
const { getDatabase } = require("../db/connect");

const getAllUsers = async (req, res) => {
  try {
    const db = getDatabase();

    const users = await db
      .collection("users")
      .find()
      .toArray();

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);

    return res.status(500).json({
      error: "Failed to retrieve users",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid user ID",
      });
    }

    const db = getDatabase();

    const user = await db
      .collection("users")
      .findOne({
        _id: new ObjectId(id),
      });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);

    return res.status(500).json({
      error: "Failed to retrieve user",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const db = getDatabase();

    const existingUser = await db
      .collection("users")
      .findOne({
        email: req.body.email.toLowerCase(),
      });

    if (existingUser) {
      return res.status(409).json({
        error: "A user with this email already exists",
      });
    }

    const user = {
      authId: req.body.authId,
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      role: req.body.role,
      createdAt: new Date(),
    };

    const result = await db
      .collection("users")
      .insertOne(user);

    return res.status(201).json({
      message: "User created successfully",
      userId: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating user:", error);

    return res.status(500).json({
      error: "Failed to create user",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid user ID",
      });
    }

    const db = getDatabase();

    const duplicateUser = await db
      .collection("users")
      .findOne({
        email: req.body.email.toLowerCase(),
        _id: {
          $ne: new ObjectId(id),
        },
      });

    if (duplicateUser) {
      return res.status(409).json({
        error: "A user with this email already exists",
      });
    }

    const user = {
      authId: req.body.authId,
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      role: req.body.role,
    };

    const result = await db
      .collection("users")
      .updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: user,
        }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);

    return res.status(500).json({
      error: "Failed to update user",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid user ID",
      });
    }

    const db = getDatabase();

    const result = await db
      .collection("users")
      .deleteOne({
        _id: new ObjectId(id),
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);

    return res.status(500).json({
      error: "Failed to delete user",
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};