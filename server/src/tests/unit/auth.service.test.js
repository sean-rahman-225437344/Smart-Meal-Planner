import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import * as AuthService from "../../auth/auth.service.js";
import User from "../../auth/user.model.js";

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri, { dbName: "mealplanner_test" });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("AuthService (in-memory DB)", () => {
  it("registers a new user with hashed password", async () => {
    const user = await AuthService.register({
      email: "unit@test.com",
      password: "mypassword",
      name: "Unit Test",
    });

    expect(user.email).toBe("unit@test.com");

    const dbUser = await User.findOne({ email: "unit@test.com" });
    expect(dbUser).not.toBeNull();
    expect(dbUser.passwordHash).not.toBe("mypassword");
  });

  it("throws AUTH-409 if user already exists", async () => {
    await AuthService.register({
      email: "exists@test.com",
      password: "mypassword",
      name: "Dup User",
    });

    await expect(
      AuthService.register({
        email: "exists@test.com",
        password: "mypassword",
        name: "Dup Again",
      })
    ).rejects.toMatchObject({
      code: "AUTH-409",
      message: "User already exists",
    });
  });

  it("logs in with correct credentials", async () => {
    await AuthService.register({
      email: "login@test.com",
      password: "mypassword",
      name: "Login User",
    });

    const user = await AuthService.login({
      email: "login@test.com",
      password: "mypassword",
    });

    expect(user.email).toBe("login@test.com");
  });

  it("throws AUTH-401 on wrong password", async () => {
    await AuthService.register({
      email: "wrongpass@test.com",
      password: "correctpass",
      name: "Wrong Pass",
    });

    await expect(
      AuthService.login({
        email: "wrongpass@test.com",
        password: "badpass",
      })
    ).rejects.toMatchObject({
      code: "AUTH-401",
      message: "Invalid credentials",
    });
  });
});
