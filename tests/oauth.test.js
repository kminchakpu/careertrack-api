const request = require("supertest");
const app = require("../app");

describe("Google OAuth", () => {
  test("GET /auth/google starts Google authentication", async () => {
    const response = await request(app)
      .get("/auth/google")
      .redirects(0);

    expect(response.statusCode).toBe(302);

    expect(response.headers.location).toContain(
      "accounts.google.com"
    );
  });

  test("GET /auth/profile returns 401 without a session", async () => {
    const response = await request(app).get(
      "/auth/profile"
    );

    expect(response.statusCode).toBe(401);

    expect(response.body).toEqual({
      error: "Not authenticated",
    });
  });
});