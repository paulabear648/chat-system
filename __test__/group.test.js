const session = require("supertest-session");
const employeeDatabase = require("../db/employeeDatabase");
const employeeIdDatabase = require("../db/employeeIdDatabase");
const groupDatabase = require("../db/groupDatabase");
const positionDatabase = require("../db/positionDatabase");
const initAllDb = require("../db/initializer/initAllDb");

const app = require("../src/app");

beforeEach(async () => {
  await initAllDb();
});

afterEach(async () => {
  await initAllDb();
});

describe("GET /groups", () => {
  let testSession = null;

  beforeEach(async () => {
    testSession = await session(app);
    await employeeIdDatabase.syncForce();
    await employeeDatabase.syncForce();
    await groupDatabase.syncForce();
    await positionDatabase.syncForce();
    await positionDatabase.addPosition(2, "regular");
    await employeeIdDatabase.addEmployeeId("rr123456");
    await employeeDatabase.addEmployee("rr123456", "Taro", "debugger", 2);
    await groupDatabase.insert("teamA", "group");
    await testSession
      .post("/login")
      .type("form")
      .send({ pass: "debugger", user: "rr123456" })
      .expect(302)
      .expect("Found. Redirecting to /login");
  });
  it("get groups", async () => {
    expect.assertions(0);
    await testSession.get("/groups").expect(302);
  });
});
