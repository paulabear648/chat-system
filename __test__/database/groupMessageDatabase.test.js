const employeeDatabase = require("../../db/employeeDatabase");
const employeeIdDatabase = require("../../db/employeeIdDatabase");
const groupDatabase = require("../../db/groupDatabase");
const groupMessageDatabase = require("../../db/groupMessageDatabase");
const initAllDb = require("../../db/initializer/initAllDb");
const positionDatabase = require("../../db/positionDatabase");

beforeEach(async () => {
  await initAllDb();
  await positionDatabase.addPosition(0, "manager");
  await employeeIdDatabase.addEmployeeId("rr123456");
  await employeeDatabase.addEmployee("rr123456", "taro", "password", 0);
  await groupDatabase.insert("sampleGroup", "group");
});

afterEach(async () => {
  await initAllDb();
});

/*
 *describe("insert and select entire groupMessages", () => {
 *  it("データの挿入と全てのグループメッセージの読み込み", async () => {
 *    expect.assertions(1);
 *
 *    await groupMessageDatabase.addGroupMessage("hello", "rr123456", 1);
 *    expect(
 *      JSON.stringify(await groupMessageDatabase.selectGroupMessage())
 *    ).toMatch(
 *      /[{"id":1,"content":"hello","time":*,"senderId":"rr123456","groupId":1}]/u
 *    );
 *  });
 *});
 *
 *describe("引数間違い", () => {
 *  it("その１", async () => {
 *    expect.assertions(1);
 *    await groupMessageDatabase.addGroupMessage(1);
 *    expect(await groupMessageDatabase.selectGroupMessage()).toEqual([]);
 *  });
 *  it("その２", async () => {
 *    expect.assertions(1);
 *    await groupMessageDatabase.addGroupMessage("content", "hello");
 *    expect(await groupMessageDatabase.selectGroupMessage()).toEqual([]);
 *  });
 *});
 */
describe("select  groupMessages by Id", () => {
  it("特定のグループのメッセージの読み込み", async () => {
    expect.assertions(1);
    await groupDatabase.insert("sampleGroup2", "group");
    await groupMessageDatabase.addGroupMessage("hello", "rr123456", 1);
    await groupMessageDatabase.addGroupMessage("hey", "rr123456", 2);
    expect(
      JSON.stringify(await groupMessageDatabase.selectGroupMessageById(1))
    ).toMatch(
      /[{"id":1,"content":"hello","time":*,"senderId":"rr123456","groupId":1}]/u
    );
  });
});
