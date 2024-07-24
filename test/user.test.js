import supertest from "supertest";
import { web } from "../src/app/web.js";
import { prismaClient } from "../src/app/database";
import { logger } from "../src/app/logging.js";

describe("POST /api/users", () => {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "kuntowck",
      },
    });
  });

  it("should can register new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "kuntowck",
      password: "rahasia",
      name: "kunto wicaksono",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("kuntowck");
    expect(result.body.data.name).toBe("kunto wicaksono");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if username already registered", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "kuntowck",
      password: "rahasia",
      name: "kunto wicaksono",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("kuntowck");
    expect(result.body.data.name).toBe("kunto wicaksono");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post("/api/users").send({
      username: "kuntowck",
      password: "rahasia",
      name: "kunto wicaksono",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
