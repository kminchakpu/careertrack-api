const request = require("supertest");

jest.mock("../db/connect", () => ({
  getDatabase: jest.fn(),
  connectDatabase: jest.fn(),
  closeDatabase: jest.fn(),
}));

const app = require("../app");

describe("CareerTrack API", () => {
  describe("Public endpoints", () => {
    test("GET / should return the CareerTrack API welcome message", async () => {
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

  describe("Protected application endpoints", () => {
    test("GET /api/applications should require authentication", async () => {
      const response = await request(app).get(
        "/api/applications"
      );

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });

    test("GET /api/applications/:id should require authentication", async () => {
      const response = await request(app).get(
        "/api/applications/68de11111111111111111111"
      );

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });
  });

  describe("Protected company endpoints", () => {
    test("GET /api/companies should require authentication", async () => {
      const response = await request(app).get(
        "/api/companies"
      );

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });

    test("GET /api/companies/:id should require authentication", async () => {
      const response = await request(app).get(
        "/api/companies/68de33333333333333333333"
      );

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });
  });

  describe("Protected interview endpoints", () => {
    test("GET /api/interviews should require authentication", async () => {
      const response = await request(app).get(
        "/api/interviews"
      );

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });

    test("GET /api/interviews/:id should require authentication", async () => {
      const response = await request(app).get(
        "/api/interviews/68de55555555555555555555"
      );

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });
  });

  describe("Protected user endpoints", () => {
    test("GET /api/users should require authentication", async () => {
      const response = await request(app).get(
        "/api/users"
      );

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });

    test("GET /api/users/:id should require authentication", async () => {
      const response = await request(app).get(
        "/api/users/68de77777777777777777777"
      );

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });
  });

  describe("Unknown routes", () => {
    test("GET unknown route should return 404", async () => {
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