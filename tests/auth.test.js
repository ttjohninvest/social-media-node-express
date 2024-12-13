const request = require("supertest");
const app = require("../server");
const { describe, it, expect } = require("@jest/globals");

describe("Auth API", () => {
  it("should login successfully with valid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "guest123",
      password: "1234",
    });

    expect(res.statusCode).toBe(200);
  });

  it("should fail to login with invalid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "wronguser",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("err", "Failed to Login");
  });
});
