const app = require("../src/app");
const request = require("supertest");
const session = require("supertest-session");
const initAllDb = require("../db/initializer/initAllDb");
const groupDatabase = require("../db/groupDatabase");
const employeeDatabase = require("../db/employeeDatabase");
const positionDatabase = require("../db/positionDatabase");
const employeeIdDatabase = require("../db/employeeIdDatabase");

beforeEach(async () => {
  await initAllDb();
});
afterEach(async () => {
  await initAllDb();
});

describe("GET /chat", () => {
  let testSession = null;

  beforeEach(async () => {
    testSession = await session(app);
    await positionDatabase.addPosition(2, "manager");
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

  it("get chat", async () => {
    expect.assertions(0);
    await testSession.get("/chat/1").expect(302);
  });
});

describe("POST /chat/message", () => {
  it("redirect after adding a message", async () => {
    expect.assertions(0);
    await positionDatabase.addPosition(2, "manager");
    await employeeIdDatabase.addEmployeeId("rr123456");
    await employeeDatabase.addEmployee("ee111111", "fumito", "hello0000", 2);
    await groupDatabase.insert("teamA", "group");
    await request(app)
      .post("/chat/message/1")
      .type("form")
      .send({
        content: "samplesample",
      })
      .expect(302);
  });
});

/*
 *Describe("POST /tasks/update", () => {
 *  it("redirect after updating a task", async () => {
 *    expect.assertions(0);
 *    await request(app)
 *      .post("/tasks/update")
 *      .type("form")
 *      .send({
 *        content: "samplesamplesample",
 *        deadline: new Date(),
 *        group: "sample",
 *        name: "sample",
 *        updateRadio: 1,
 *      })
 *      .expect(302);
 *  });
 *});
 *
 *describe("POST /tasks/delete", () => {
 *  it("redirect after deleting a task", async () => {
 *    expect.assertions(0);
 *    await request(app)
 *      .post("/tasks/delete")
 *      .type("form")
 *      .send({
 *        deleteRadio: 1,
 *      })
 *      .expect(302);
 *  });
 *});
 */
