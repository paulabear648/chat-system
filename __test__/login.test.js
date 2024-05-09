const app = require("../src/app");
const session = require("supertest-session");

const employeeDatabase = require("../db/employeeDatabase");
const groupDatabase = require("../db/groupDatabase");
const employeeIdDatabase = require("../db/employeeIdDatabase");
const initAllDb = require("../db/initializer/initAllDb");
const positionDatabase = require("../db/positionDatabase");

let testSession = null;

beforeEach(async () => {
  testSession = await session(app);
  await initAllDb();
  await positionDatabase.addPosition(2, "manager");
  await employeeIdDatabase.addEmployeeId("rr123456");
  await employeeDatabase.addEmployee("rr123456", "Taro", "debugger", 2);
  await groupDatabase.insert("teamA", "group");
});

afterEach(async () => {
  await initAllDb();
});

describe("before authenticating session", () => {
  it("should fail accessing a restricted page", async () => {
    expect.assertions(0);
    await testSession.get("/login").expect(200);
  });
});

describe("after authenticating session", () => {
  let authenticatedSession = null;

  beforeEach(async () => {
    await testSession
      .post("/login")
      .type("form")
      .send({ pass: "debugger", user: "rr123456" })
      .expect(302);
    authenticatedSession = testSession;
  });

  it("should get a restricted page", async () => {
    expect.assertions(0);
    await authenticatedSession.get("/login").expect(200);
  });
});
