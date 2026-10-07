jest.mock("../middleware/authMiddleware", () => ({
  ensureAuthenticated: (req, res, next) => {
    req.user = {
      _id: "68de44444444444444444444",
      authId: "google-test-001",
      name: "CareerTrack Test User",
      email: "testuser@example.com",
      role: "user",
    };

    req.isAuthenticated = () => true;

    next();
  },
}));

const request = require("supertest");
const app = require("../app");
const { getDatabase } = require("../db/connect");

jest.mock("../db/connect", () => ({
  getDatabase: jest.fn(),
}));

describe("Authenticated user writes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /api/users allows an authenticated request", async () => {
    const findOne = jest.fn().mockResolvedValue(null);

    const insertOne = jest.fn().mockResolvedValue({
      insertedId: "68de66666666666666666666",
    });

    getDatabase.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        findOne,
        insertOne,
      }),
    });

    const response = await request(app)
      .post("/api/users")
      .send({
        authId: "google-new-user-001",
        name: "New Test User",
        email: "newuser@example.com",
        role: "user",
      });

    expect(response.statusCode).toBe(201);

    expect(response.body.message).toBe(
      "User created successfully"
    );

    expect(insertOne).toHaveBeenCalledTimes(1);
  });

  test("PUT /api/users/:id allows an authenticated request", async () => {
    const findOne = jest.fn().mockResolvedValue(null);

    const updateOne = jest.fn().mockResolvedValue({
      matchedCount: 1,
      modifiedCount: 1,
    });

    getDatabase.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        findOne,
        updateOne,
      }),
    });

    const response = await request(app)
      .put("/api/users/68de44444444444444444444")
      .send({
        authId: "google-test-001",
        name: "Updated Test User",
        email: "updated@example.com",
        role: "user",
      });

    expect(response.statusCode).toBe(200);

    expect(response.body.message).toBe(
      "User updated successfully"
    );

    expect(updateOne).toHaveBeenCalledTimes(1);
  });

  test("DELETE /api/users/:id allows an authenticated request", async () => {
    const deleteOne = jest.fn().mockResolvedValue({
      deletedCount: 1,
    });

    getDatabase.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        deleteOne,
      }),
    });

    const response = await request(app).delete(
      "/api/users/68de44444444444444444444"
    );

    expect(response.statusCode).toBe(200);

    expect(response.body.message).toBe(
      "User deleted successfully"
    );

    expect(deleteOne).toHaveBeenCalledTimes(1);
  });
});