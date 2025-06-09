import request from "supertest";
import app from "../app.js";

describe("POST /api/auth/login", () => {
  it("debe devolver un token con credenciales válidas", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "admin@correo.com",
      password: "123456", // ajusta si usas otro
    }).set("Accept", "application/json");;

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("debe fallar con contraseña incorrecta", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "admin@correo.com",
      password: "malapassword",
    }).set("Accept", "application/json");;

    expect(res.statusCode).toBe(401);
    expect(res.body.token).toBeUndefined();
  });

  it("debe fallar si falta el email", async () => {
    const res = await request(app).post("/api/auth/login").send({
      password: "123456",
    }).set("Accept", "application/json");;

    expect(res.statusCode).toBe(400);
  });
});
