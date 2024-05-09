const app = require("../src/app");
const request = require("supertest");

describe("GET /", () => {
  it("get toppage", async () => {
    expect.assertions(0);
    await request(app)
      .get("/")
      .expect(302)
      .expect("Found. Redirecting to /login");
  });
});

describe("GET /login", () => {
  it("get login page", async () => {
    expect.assertions(0);
    await request(app).get("/login").expect(200);
  });
});
