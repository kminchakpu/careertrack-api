jest.mock("../db/connect", () => ({
  getDatabase: jest.fn(),
}));

const request = require("supertest");
const { ObjectId } = require("mongodb");
const { getDatabase } = require("../db/connect");
const app = require("../app");

describe("Users GET routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/users", () => {
    test("returns 200 and all users", async () => {
      const users = [
        {
          _id: new ObjectId("68de44444444444444444441"),
          authId: "google-test-001",
          name: "Daniel Okafor",
          email: "daniel.okafor@example.com",
          role: "user",
          createdAt: new Date(),
        },
        {
          _id: new ObjectId("68de44444444444444444442"),
          authId: "google-test-002",
          name: "Sarah Johnson",
          email: "sarah.johnson@example.com",
          role: "user",
          createdAt: new Date(),
        },
      ];

      const toArray = jest.fn().mockResolvedValue(users);

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
        "/api/users"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe(
        "Daniel Okafor"
      );
      expect(response.body[1].name).toBe(
        "Sarah Johnson"
      );

      expect(collection).toHaveBeenCalledWith("users");
      expect(find).toHaveBeenCalledTimes(1);
      expect(toArray).toHaveBeenCalledTimes(1);
    });

    test("returns 200 and an empty array when no users exist", async () => {
      const toArray = jest.fn().mockResolvedValue([]);

      getDatabase.mockReturnValue({
        collection: jest.fn().mockReturnValue({
          find: jest.fn().mockReturnValue({
            toArray,
          }),
        }),
      });

      const response = await request(app).get(
        "/api/users"
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
        "/api/users"
      );

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({
        error: "Failed to retrieve users",
      });
    });
  });

  describe("GET /api/users/:id", () => {
    test("returns 200 and the requested user", async () => {
      const user = {
        _id: new ObjectId("68de44444444444444444441"),
        authId: "google-test-001",
        name: "Daniel Okafor",
        email: "daniel.okafor@example.com",
        role: "user",
      };

      const findOne = jest
        .fn()
        .mockResolvedValue(user);

      getDatabase.mockReturnValue({
        collection: jest.fn().mockReturnValue({
          findOne,
        }),
      });

      const response = await request(app).get(
        "/api/users/68de44444444444444444441"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe(
        "Daniel Okafor"
      );
      expect(response.body.email).toBe(
        "daniel.okafor@example.com"
      );
      expect(findOne).toHaveBeenCalledTimes(1);
    });

    test("returns 400 for an invalid user ID", async () => {
      const response = await request(app).get(
        "/api/users/not-a-valid-id"
      );

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: "Invalid user ID",
      });
    });

    test("returns 404 when the user does not exist", async () => {
      const findOne = jest.fn().mockResolvedValue(null);

      getDatabase.mockReturnValue({
        collection: jest.fn().mockReturnValue({
          findOne,
        }),
      });

      const response = await request(app).get(
        "/api/users/68de44444444444444444499"
      );

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        error: "User not found",
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
        "/api/users/68de44444444444444444441"
      );

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({
        error: "Failed to retrieve user",
      });
    });
  });
});