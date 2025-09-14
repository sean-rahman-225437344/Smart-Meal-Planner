import request from "supertest";
import app from "../../app.js";
import { connectTestDB, closeTestDB, clearDB } from "./setup.js";

beforeAll(async () => await connectTestDB());
afterAll(async () => await closeTestDB());
afterEach(async () => await clearDB());

describe("Auth Routes", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/auth/register").send({
      email: "test@test.com",
      password: "mypassword",
      name: "Test User",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe("test@test.com");
  });

  it("should login with correct credentials", async () => {
    await request(app).post("/auth/register").send({
      email: "login@test.com",
      password: "mypassword",
      name: "Login User",
    });

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "login@test.com", password: "mypassword" });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe("login@test.com");
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  it("should reject login with wrong password", async () => {
    await request(app).post("/auth/register").send({
      email: "wrong@test.com",
      password: "mypassword",
      name: "Wrong Pass",
    });

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "wrong@test.com", password: "badpass" });

    expect(res.statusCode).toBe(401);
    expect(res.body).toMatchObject({
      code: "AUTH-401",
      message: "Invalid credentials",
    });
  });
});
