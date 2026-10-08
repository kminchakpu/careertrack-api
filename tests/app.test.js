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
    test("POST /api/applications should require authentication", async () => {
      const response = await request(app)
        .post("/api/applications")
        .send({});

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });

    test("PUT /api/applications/:id should require authentication", async () => {
      const response = await request(app)
        .put("/api/applications/68de11111111111111111111")
        .send({});

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });

    test("DELETE /api/applications/:id should require authentication", async () => {
      const response = await request(app).delete(
        "/api/applications/68de11111111111111111111"
      );

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });
  });

  describe("Protected company endpoints", () => {
    test("POST /api/companies should require authentication", async () => {
      const response = await request(app)
        .post("/api/companies")
        .send({});

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });

    test("PUT /api/companies/:id should require authentication", async () => {
      const response = await request(app)
        .put("/api/companies/68de33333333333333333333")
        .send({});

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });

    test("DELETE /api/companies/:id should require authentication", async () => {
      const response = await request(app).delete(
        "/api/companies/68de33333333333333333333"
      );

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });
  });

  describe("Protected interview endpoints", () => {
    test("POST /api/interviews should require authentication", async () => {
      const response = await request(app)
        .post("/api/interviews")
        .send({});

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });

    test("PUT /api/interviews/:id should require authentication", async () => {
      const response = await request(app)
        .put("/api/interviews/68de55555555555555555555")
        .send({});

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });

    test("DELETE /api/interviews/:id should require authentication", async () => {
      const response = await request(app).delete(
        "/api/interviews/68de55555555555555555555"
      );

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });
  });

  describe("Protected user endpoints", () => {
    test("POST /api/users should require authentication", async () => {
      const response = await request(app)
        .post("/api/users")
        .send({});

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });

    test("PUT /api/users/:id should require authentication", async () => {
      const response = await request(app)
        .put("/api/users/68de77777777777777777777")
        .send({});

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });

    test("DELETE /api/users/:id should require authentication", async () => {
      const response = await request(app).delete(
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