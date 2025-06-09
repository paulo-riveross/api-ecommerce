import request from "supertest";
import app from "../app.js";

describe("GET /api/products", () => {
  it("debe devolver status 200 y un array", async () => {
    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
