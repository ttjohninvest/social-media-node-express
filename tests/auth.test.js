const request = require("supertest");
const app = require("../server");
const { describe, it, expect } = require("@jest/globals");

describe("Auth API Routes", () => {
  // Signup tests

  const randomUsername = "test_user_" + Math.random().toString(36).substring(7);

  it("should signup successfully with valid details", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      username: randomUsername,
      password: "1234",
      fullname: "newuser@example.com",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("username", randomUsername);
  });

  it("should fail to signup with an existing username", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      username: randomUsername,
      password: "1234",
      fullname: "name",
    });

    await request(app).post("/api/auth/signup").send({
      username: "guest123",
      password: "1234",
      fullname: "anotheremail@example.com",
    });

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("err", "Failed to signup");
  });

  it("should fail with missing fields", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      username: "newuser123",
    });

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("err", "Failed to signup");
  });

  it("should fail with empty request body", async () => {
    const res = await request(app).post("/api/auth/signup").send({});

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("err", "Failed to signup");
  });

  // Login tests

  it("should login successfully with valid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: randomUsername,
      password: "1234",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id");
  });

  it("should fail to login with invalid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "wronguser",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("err", "Failed to Login");
  });

  it("should fail with missing username", async () => {
    const res = await request(app).post("/api/auth/login").send({
      password: "1234",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("err", "Failed to Login");
  });

  it("should fail with missing password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: randomUsername,
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("err", "Failed to Login");
  });

  it("should fail with empty request body", async () => {
    const res = await request(app).post("/api/auth/login").send({});

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("err", "Failed to Login");
  });
});

describe("User API Routes", () => {
  describe("GET /api/user", () => {
    it("should fetch all users", async () => {
      const res = await request(app).get("/api/user");

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/user/:id", () => {
    it("should return 500 if user is not found", async () => {
      const userId = "nonExistingUserId";
      const res = await request(app).get(`/api/user/${userId}`);
      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("err", "Failed to get user");
    });
  });
});
