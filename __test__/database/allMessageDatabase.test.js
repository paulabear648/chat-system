const allMessageDatabase = require("../../db/allMessageDatabase");
const employeeDatabase = require("../../db/employeeDatabase");
const employeeIdDatabase = require("../../db/employeeIdDatabase");
const initAllDb = require("../../db/initializer/initAllDb");
const positionDatabase = require("../../db/positionDatabase");

beforeEach(async () => {
  await initAllDb();
  await positionDatabase.addPosition(0, "manager");
  await employeeIdDatabase.addEmployeeId("rr123456");
});

afterEach(async () => {
  await initAllDb();
});

describe("insert and select entire messages", () => {
  it("データの挿入と全てのメッセージの読み込み", async () => {
    expect.assertions(1);
    await employeeDatabase.addEmployee("rr123456", "taro", "password", 0);
    await allMessageDatabase.addMessage("sample", "rr123456");
    expect(
      JSON.stringify(await allMessageDatabase.selectEntireMessage())
    ).toMatch(/[{"id":1,"content":"sample","time":*:,"senderId":"rr123456"}]/u);
  });
});
