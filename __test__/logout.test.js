const app = require("../src/app");
const session = require("supertest-session");

const employeeDatabase = require("../db/employeeDatabase");
const groupDatabase = require("../db/groupDatabase");
const employeeIdDatabase = require("../db/employeeIdDatabase");
const positionDatabase = require("../db/positionDatabase");
const initAllDb = require("../db/initializer/initAllDb");

let testSession = null;
let authenticatedSession = null;
let unauthenticatedSession = null;
beforeEach(async () => {
  testSession = await session(app);
  await initAllDb();
  await positionDatabase.addPosition(0, "manager");
  await employeeIdDatabase.addEmployeeId("rr123456");
  await employeeDatabase.addEmployee("rr123456", "Taro", "debugger", 0);
  await groupDatabase.insert("teamA", "group");
});

afterEach(async () => {
  await initAllDb();
});

describe("before logout", () => {
  it("can get groups", async () => {
    expect.assertions(0);
    await testSession
      .post("/login")
      .type("form")
      .send({ pass: "debugger", user: "rr123456" })
      .expect(302)
      .expect("Found. Redirecting to /login");
    authenticatedSession = testSession;
    await authenticatedSession.get("/login").expect(200);
  });
});

describe("after logout", () => {
  it("cannot get groups", async () => {
    expect.assertions(0);
    await testSession
      .post("/login")
      .type("form")
      .send({ pass: "debugger", user: "rr123456" })
      .expect(302)
      .expect("Found. Redirecting to /login");

    authenticatedSession = testSession;

    await authenticatedSession
      .post("/logout")
      .expect(302)
      .expect("Found. Redirecting to /login");

    unauthenticatedSession = authenticatedSession;

    await unauthenticatedSession.get("/login").expect(200);
  });
});
