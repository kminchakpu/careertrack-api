jest.mock("../db/connect", () => ({
  getDatabase: jest.fn(),
}));

const request = require("supertest");
const { ObjectId } = require("mongodb");
const { getDatabase } = require("../db/connect");
const app = require("../app");

describe("Interviews GET routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/interviews", () => {
    test("returns 200 and all interviews", async () => {
      const interviews = [
        {
          _id: new ObjectId("68de33333333333333333331"),
          applicationId: "68de11111111111111111111",
          interviewDate: new Date(
            "2026-10-15T10:00:00.000Z"
          ),
          interviewType: "Technical",
          interviewer: "Sarah Johnson",
          location: "Online - Google Meet",
          status: "Scheduled",
          notes: "Prepare Node.js questions.",
        },
        {
          _id: new ObjectId("68de33333333333333333332"),
          applicationId: "68de11111111111111111112",
          interviewDate: new Date(
            "2026-10-17T14:00:00.000Z"
          ),
          interviewType: "Final",
          interviewer: "Michael Brown",
          location: "Online - Zoom",
          status: "Scheduled",
          notes: "Final interview.",
        },
      ];

      const toArray = jest
        .fn()
        .mockResolvedValue(interviews);

      const find = jest.fn().mockReturnValue({
        toArray,
      });

      const collection = jest.fn().mockReturnValue({
        find,
      });

      getDatabase.mockReturnValue({
        collection,
      });

      const response = await request(app).get(
        "/api/interviews"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].interviewType).toBe(
        "Technical"
      );
      expect(response.body[1].interviewType).toBe(
        "Final"
      );

      expect(collection).toHaveBeenCalledWith(
        "interviews"
      );
      expect(find).toHaveBeenCalledTimes(1);
      expect(toArray).toHaveBeenCalledTimes(1);
    });

    test("returns 200 and an empty array when no interviews exist", async () => {
      const toArray = jest.fn().mockResolvedValue([]);

      getDatabase.mockReturnValue({
        collection: jest.fn().mockReturnValue({
          find: jest.fn().mockReturnValue({
            toArray,
          }),
        }),
      });

      const response = await request(app).get(
        "/api/interviews"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]);
    });

    test("returns 500 when the database fails", async () => {
      const toArray = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));

      getDatabase.mockReturnValue({
        collection: jest.fn().mockReturnValue({
          find: jest.fn().mockReturnValue({
            toArray,
          }),
        }),
      });

      const response = await request(app).get(
        "/api/interviews"
      );

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({
        error: "Failed to retrieve interviews",
      });
    });
  });

  describe("GET /api/interviews/:id", () => {
    test("returns 200 and the requested interview", async () => {
      const interview = {
        _id: new ObjectId("68de33333333333333333331"),
        applicationId: "68de11111111111111111111",
        interviewDate: new Date(
          "2026-10-15T10:00:00.000Z"
        ),
        interviewType: "Technical",
        interviewer: "Sarah Johnson",
        location: "Online - Google Meet",
        status: "Scheduled",
      };

      const findOne = jest
        .fn()
        .mockResolvedValue(interview);

      getDatabase.mockReturnValue({
        collection: jest.fn().mockReturnValue({
          findOne,
        }),
      });

      const response = await request(app).get(
        "/api/interviews/68de33333333333333333331"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.interviewType).toBe(
        "Technical"
      );
      expect(response.body.status).toBe("Scheduled");
      expect(findOne).toHaveBeenCalledTimes(1);
    });

    test("returns 400 for an invalid interview ID", async () => {
      const response = await request(app).get(
        "/api/interviews/not-valid"
      );

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: "Invalid interview ID",
      });
    });

    test("returns 404 when the interview does not exist", async () => {
      const findOne = jest.fn().mockResolvedValue(null);

      getDatabase.mockReturnValue({
        collection: jest.fn().mockReturnValue({
          findOne,
        }),
      });

      const response = await request(app).get(
        "/api/interviews/68de33333333333333333399"
      );

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        error: "Interview not found",
      });
    });

    test("returns 500 when the database fails", async () => {
      const findOne = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));

      getDatabase.mockReturnValue({
        collection: jest.fn().mockReturnValue({
          findOne,
        }),
      });

      const response = await request(app).get(
        "/api/interviews/68de33333333333333333331"
      );

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({
        error: "Failed to retrieve interview",
      });
    });
  });
});