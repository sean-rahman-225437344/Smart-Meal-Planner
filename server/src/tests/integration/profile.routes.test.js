import request from "supertest";
import app from "../../app.js";
import { connectTestDB, closeTestDB, clearDB } from "./setup.js";

beforeAll(async () => await connectTestDB());
afterAll(async () => await closeTestDB());
afterEach(async () => await clearDB());

describe("Profile Routes", () => {
  it("should return 401 if not logged in", async () => {
    const res = await request(app).get("/api/me");
    expect(res.statusCode).toBe(401);
    expect(res.body).toMatchObject({
      code: "AUTH-401",
      message: "Not authenticated",
    });
  });

  it("should fetch user and empty profile after login", async () => {
    const agent = request.agent(app);

    // Register + login
    await agent.post("/auth/register").send({
      email: "profile@test.com",
      password: "mypassword",
      name: "Profile User",
    });

    const res = await agent.get("/api/me");
    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe("profile@test.com");
    expect(res.body.profile).toBeNull();
  });
});
