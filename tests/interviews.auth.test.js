const request = require("supertest");
const app = require("../app");

describe("Interview authentication", () => {
  describe("Unauthenticated write requests", () => {
    test("POST /api/interviews should return 401", async () => {
      const response = await request(app)
        .post("/api/interviews")
        .send({
          applicationId: "68de11111111111111111111",
          interviewDate: "2026-10-15T10:00:00.000Z",
          interviewType: "Technical",
          interviewer: "Test Interviewer",
          location: "Online",
          status: "Scheduled",
          notes: "Test interview",
        });

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });

    test("PUT /api/interviews/:id should return 401", async () => {
      const response = await request(app)
        .put("/api/interviews/68de33333333333333333333")
        .send({
          applicationId: "68de11111111111111111111",
          interviewDate: "2026-10-16T10:00:00.000Z",
          interviewType: "Technical",
          interviewer: "Test Interviewer",
          location: "Online",
          status: "Scheduled",
          notes: "Updated interview",
        });

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });

    test("DELETE /api/interviews/:id should return 401", async () => {
      const response = await request(app).delete(
        "/api/interviews/68de33333333333333333333"
      );

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        error: "Authentication required",
      });
    });
  });
});