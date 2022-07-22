import { app } from "../src/index.js";
import supertest from "supertest";
import client from "../src/config/database.js";

describe("Testando Criação de User", () => {
  it("Criando User", async () => {
    const body = {
      email: "allan@gmail.com",
      password: "1234567890",
    };
    const result = await supertest(app).post("/signup").send(body);
    const status = result.status;

    expect(status).toEqual(201);
  });

  it("Usuario Invalido", async () => {
    const body = {
      email: "allan",
      password: "",
    };
    const result = await supertest(app).post("/signup").send(body);
    const status = result.status;
    expect(status).toEqual(422);
  });

  it("Inserindo o mesmo user 2 vezes", async () => {
    const body = {
      email: "testando@gmail.com",
      password: "1234567890",
    };
    const firsTry = await supertest(app).post("/signup").send(body);
    expect(firsTry.status).toEqual(201);

    const secondTry = await supertest(app).post("/signup").send(body);
    expect(secondTry.status).toEqual(409);
  });
});

beforeEach(async () => {
  await client.$executeRaw`TRUNCATE TABLE users CASCADE`;
});

afterAll(async () => {
  await client.$disconnect();
});
