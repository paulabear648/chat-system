const app = require("../src/app");
const request = require("supertest");

describe("GET /allChat", () => {
  it("redirecting to /login", async () => {
    expect.assertions(0);
    await request(app)
      .get("/all-chat")
      .expect(302)
      .expect("Found. Redirecting to /login");
  });
});
