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

describe("Authenticated interview writes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /api/interviews allows an authenticated user", async () => {
    const insertOne = jest.fn().mockResolvedValue({
      insertedId: "68de55555555555555555555",
    });

    getDatabase.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        insertOne,
      }),
    });

    const response = await request(app)
      .post("/api/interviews")
      .send({
        applicationId: "68de11111111111111111111",
        interviewDate: "2026-10-15T10:00:00.000Z",
        interviewType: "Technical",
        interviewer: "Sarah Johnson",
        location: "Online - Google Meet",
        status: "Scheduled",
        notes: "Technical interview",
      });

    expect(response.statusCode).toBe(201);

    expect(response.body.message).toBe(
      "Interview created successfully"
    );

    expect(insertOne).toHaveBeenCalledTimes(1);
  });

  test("PUT /api/interviews/:id allows an authenticated user", async () => {
    const updateOne = jest.fn().mockResolvedValue({
      matchedCount: 1,
      modifiedCount: 1,
    });

    getDatabase.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        updateOne,
      }),
    });

    const response = await request(app)
      .put("/api/interviews/68de33333333333333333333")
      .send({
        applicationId: "68de11111111111111111111",
        interviewDate: "2026-10-17T14:00:00.000Z",
        interviewType: "Final",
        interviewer: "Sarah Johnson",
        location: "Online - Zoom",
        status: "Rescheduled",
        notes: "Final interview rescheduled.",
      });

    expect(response.statusCode).toBe(200);

    expect(response.body.message).toBe(
      "Interview updated successfully"
    );

    expect(updateOne).toHaveBeenCalledTimes(1);
  });

  test("DELETE /api/interviews/:id allows an authenticated user", async () => {
    const deleteOne = jest.fn().mockResolvedValue({
      deletedCount: 1,
    });

    getDatabase.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        deleteOne,
      }),
    });

    const response = await request(app).delete(
      "/api/interviews/68de33333333333333333333"
    );

    expect(response.statusCode).toBe(200);

    expect(response.body.message).toBe(
      "Interview deleted successfully"
    );

    expect(deleteOne).toHaveBeenCalledTimes(1);
  });
});