const app = require("../src/app");
const request = require("supertest");
const initAllDb = require("../db/initializer/initAllDb");

beforeEach(async () => {
  await initAllDb();
});

afterEach(async () => {
  await initAllDb();
});

describe("GET /register", () => {
  it("get register page", async () => {
    expect.assertions(0);
    await request(app).get("/register").expect(200);
  });
});

describe("POST /register", () => {
  it("register a employee and redirect to /login", async () => {
    expect.assertions(0);
    await request(app)
      .post("/register")
      .type("form")
      .send({ id: "ee111111", name: "aaaa", password: "hello0000" })
      .expect(302)
      .expect("Found. Redirecting to /register");
  });
  it("if an employee is registered, not register an employee and redirect to /register", async () => {
    expect.assertions(0);
    await request(app)
      .post("/register")
      .type("form")
      .send({ id: "ee111111", name: "aaaa", password: "hello0000" });
    await request(app)
      .post("/register")
      .type("form")
      .send({ id: "ee111111", name: "aaaa", password: "hello0000" })
      .expect(302)
      .expect("Found. Redirecting to /register");
  });
});
