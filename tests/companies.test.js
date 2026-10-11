jest.mock("../db/connect", () => ({
  getDatabase: jest.fn(),
}));

const request = require("supertest");
const { ObjectId } = require("mongodb");
const { getDatabase } = require("../db/connect");
const app = require("../app");

describe("Companies GET routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/companies", () => {
    test("returns 200 and all companies", async () => {
      const companies = [
        {
          _id: new ObjectId("68de22222222222222222221"),
          name: "NaijaCloud Technologies",
          industry: "Software and Cloud Computing",
          location: "Lagos",
          country: "Nigeria",
          website: "https://example.com/naijacloud",
          contactEmail: "careers@example.com",
        },
        {
          _id: new ObjectId("68de22222222222222222222"),
          name: "BluePeak Software",
          industry: "Software Development",
          location: "Austin, Texas",
          country: "United States",
          website: "https://example.com/bluepeak",
          contactEmail: "jobs@example.com",
        },
      ];

      const toArray = jest.fn().mockResolvedValue(companies);
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
        "/api/companies"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe(
        "NaijaCloud Technologies"
      );
      expect(response.body[1].name).toBe(
        "BluePeak Software"
      );

      expect(collection).toHaveBeenCalledWith(
        "companies"
      );
      expect(find).toHaveBeenCalledTimes(1);
      expect(toArray).toHaveBeenCalledTimes(1);
    });

    test("returns 200 and an empty array when no companies exist", async () => {
      const toArray = jest.fn().mockResolvedValue([]);

      getDatabase.mockReturnValue({
        collection: jest.fn().mockReturnValue({
          find: jest.fn().mockReturnValue({
            toArray,
          }),
        }),
      });

      const response = await request(app).get(
        "/api/companies"
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
        "/api/companies"
      );

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({
        error: "Failed to retrieve companies",
      });
    });
  });

  describe("GET /api/companies/:id", () => {
    test("returns 200 and the requested company", async () => {
      const company = {
        _id: new ObjectId("68de22222222222222222221"),
        name: "NaijaCloud Technologies",
        industry: "Software and Cloud Computing",
        location: "Lagos",
        country: "Nigeria",
      };

      const findOne = jest
        .fn()
        .mockResolvedValue(company);

      getDatabase.mockReturnValue({
        collection: jest.fn().mockReturnValue({
          findOne,
        }),
      });

      const response = await request(app).get(
        "/api/companies/68de22222222222222222221"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe(
        "NaijaCloud Technologies"
      );
      expect(findOne).toHaveBeenCalledTimes(1);
    });

    test("returns 400 for an invalid company ID", async () => {
      const response = await request(app).get(
        "/api/companies/invalid-id"
      );

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: "Invalid company ID",
      });
    });

    test("returns 404 when the company does not exist", async () => {
      const findOne = jest.fn().mockResolvedValue(null);

      getDatabase.mockReturnValue({
        collection: jest.fn().mockReturnValue({
          findOne,
        }),
      });

      const response = await request(app).get(
        "/api/companies/68de22222222222222222299"
      );

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        error: "Company not found",
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
        "/api/companies/68de22222222222222222221"
      );

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({
        error: "Failed to retrieve company",
      });
    });
  });
});