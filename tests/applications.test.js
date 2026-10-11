jest.mock("../db/connect", () => ({
  getDatabase: jest.fn(),
}));

const request = require("supertest");
const { ObjectId } = require("mongodb");
const { getDatabase } = require("../db/connect");
const app = require("../app");

describe("Applications GET routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/applications", () => {
    test("returns 200 and all applications", async () => {
      const applications = [
        {
          _id: new ObjectId("68de11111111111111111111"),
          companyId: "68de22222222222222222222",
          jobTitle: "Node.js Backend Developer",
          location: "Lagos, Nigeria",
          applicationDate: new Date("2026-09-15"),
          status: "Applied",
          jobType: "Full-time",
          salaryRange: "NGN 700,000 - 1,000,000 monthly",
          jobUrl: "https://example.com/jobs/node-backend",
          notes: "Node.js and Express position",
        },
        {
          _id: new ObjectId("68de11111111111111111112"),
          companyId: "68de22222222222222222223",
          jobTitle: "React Developer",
          location: "Abuja, Nigeria",
          applicationDate: new Date("2026-09-18"),
          status: "Interview",
          jobType: "Full-time",
          salaryRange: "NGN 800,000 - 1,200,000 monthly",
          jobUrl: "https://example.com/jobs/react",
          notes: "React and Next.js position",
        },
      ];

      const toArray = jest.fn().mockResolvedValue(applications);
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
        "/api/applications"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].jobTitle).toBe(
        "Node.js Backend Developer"
      );
      expect(response.body[1].jobTitle).toBe(
        "React Developer"
      );

      expect(collection).toHaveBeenCalledWith(
        "applications"
      );
      expect(find).toHaveBeenCalledTimes(1);
      expect(toArray).toHaveBeenCalledTimes(1);
    });

    test("returns 200 and an empty array when no applications exist", async () => {
      const toArray = jest.fn().mockResolvedValue([]);

      getDatabase.mockReturnValue({
        collection: jest.fn().mockReturnValue({
          find: jest.fn().mockReturnValue({
            toArray,
          }),
        }),
      });

      const response = await request(app).get(
        "/api/applications"
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
        "/api/applications"
      );

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({
        error: "Failed to retrieve applications",
      });
    });
  });

  describe("GET /api/applications/:id", () => {
    test("returns 200 and the requested application", async () => {
      const application = {
        _id: new ObjectId("68de11111111111111111111"),
        companyId: "68de22222222222222222222",
        jobTitle: "Node.js Backend Developer",
        location: "Lagos, Nigeria",
        status: "Applied",
        jobType: "Full-time",
      };

      const findOne = jest
        .fn()
        .mockResolvedValue(application);

      getDatabase.mockReturnValue({
        collection: jest.fn().mockReturnValue({
          findOne,
        }),
      });

      const response = await request(app).get(
        "/api/applications/68de11111111111111111111"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.jobTitle).toBe(
        "Node.js Backend Developer"
      );
      expect(findOne).toHaveBeenCalledTimes(1);
    });

    test("returns 400 for an invalid application ID", async () => {
      const response = await request(app).get(
        "/api/applications/not-a-valid-id"
      );

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: "Invalid application ID",
      });
    });

    test("returns 404 when the application does not exist", async () => {
      const findOne = jest.fn().mockResolvedValue(null);

      getDatabase.mockReturnValue({
        collection: jest.fn().mockReturnValue({
          findOne,
        }),
      });

      const response = await request(app).get(
        "/api/applications/68de11111111111111111199"
      );

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        error: "Application not found",
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
        "/api/applications/68de11111111111111111111"
      );

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({
        error: "Failed to retrieve application",
      });
    });
  });
});