const request = require("supertest");

jest.mock("../db/connect", () => ({
  getDatabase: jest.fn(),
  connectDatabase: jest.fn(),
  closeDatabase: jest.fn(),
}));

const mongodb = require("../db/connect");
const app = require("../app");

describe("CareerTrack API GET endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /", () => {
    test("should return the CareerTrack API welcome message", async () => {
      const response = await request(app).get("/");

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          message: "Welcome to the CareerTrack API",
          documentation: "/api-docs",
          authentication: "/auth/google",
        })
      );
    });
  });

  describe("GET /api/applications", () => {
    test("should return all applications", async () => {
      const mockApplications = [
        {
          _id: "68de11111111111111111111",
          userId: "user-1",
          companyId: "company-1",
          jobTitle: "Backend Developer",
          status: "Applied",
        },
        {
          _id: "68de22222222222222222222",
          userId: "user-2",
          companyId: "company-2",
          jobTitle: "Frontend Developer",
          status: "Interview",
        },
      ];

      const mockToArray = jest
        .fn()
        .mockResolvedValue(mockApplications);

      const mockFind = jest.fn().mockReturnValue({
        toArray: mockToArray,
      });

      const mockCollection = jest.fn().mockReturnValue({
        find: mockFind,
      });

      mongodb.getDatabase.mockReturnValue({
        collection: mockCollection,
      });

      const response = await request(app).get(
        "/api/applications"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockApplications);
      expect(mockCollection).toHaveBeenCalledWith(
        "applications"
      );
    });
  });

  describe("GET /api/companies", () => {
    test("should return all companies", async () => {
      const mockCompanies = [
        {
          _id: "68de33333333333333333333",
          name: "Tech Solutions",
          industry: "Technology",
          location: "Lagos, Nigeria",
        },
        {
          _id: "68de44444444444444444444",
          name: "Career Systems",
          industry: "Software",
          location: "Abuja, Nigeria",
        },
      ];

      const mockToArray = jest
        .fn()
        .mockResolvedValue(mockCompanies);

      const mockFind = jest.fn().mockReturnValue({
        toArray: mockToArray,
      });

      const mockCollection = jest.fn().mockReturnValue({
        find: mockFind,
      });

      mongodb.getDatabase.mockReturnValue({
        collection: mockCollection,
      });

      const response = await request(app).get(
        "/api/companies"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockCompanies);
      expect(mockCollection).toHaveBeenCalledWith(
        "companies"
      );
    });
  });

  describe("GET unknown route", () => {
    test("should return 404 for an unknown route", async () => {
      const response = await request(app).get(
        "/api/does-not-exist"
      );

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        error: "Route not found",
      });
    });
  });
});