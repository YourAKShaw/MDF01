import request from "supertest";
import app from "../app";

describe("User Endpoints", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/users/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "User created successfully");
  });

  it("should login an existing user", async () => {
    const res = await request(app).post("/users/login").send({
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should return 401 for invalid login credentials", async () => {
    const res = await request(app).post("/users/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message", "Invalid email or password");
  });
});
