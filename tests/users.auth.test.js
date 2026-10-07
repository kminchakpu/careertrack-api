const request = require("supertest");
const app = require("../app");

describe("User authentication", () => {
  describe("Unauthenticated write requests", () => {
    test("POST /api/users should return 401", async () => {
      const response = await request(app)
        .post("/api/users")
        .send({
          authId: "google-test-001",
          name: "Test User",
          email: "test@example.com",
          role: "user",
        });

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });

    test("PUT /api/users/:id should return 401", async () => {
      const response = await request(app)
        .put("/api/users/68de44444444444444444444")
        .send({
          authId: "google-test-001",
          name: "Updated Test User",
          email: "test@example.com",
          role: "user",
        });

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });

    test("DELETE /api/users/:id should return 401", async () => {
      const response = await request(app).delete(
        "/api/users/68de44444444444444444444"
      );

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });
  });
});