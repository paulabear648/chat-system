const employeeDatabase = require("../../db/employeeDatabase");
const employeeIdDatabase = require("../../db/employeeIdDatabase");
const groupDatabase = require("../../db/groupDatabase");
const groupParticipantDatabase = require("../../db/groupParticipantDatabase");
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

describe("insert and select entire groupParticipants", () => {
  it("データの挿入と全てのグループ所属者の読み込み", async () => {
    expect.assertions(1);
    await employeeDatabase.addEmployee("rr123456", "taro", "password", 0);
    await groupDatabase.insert("sampleGroup", "group");
    console.log(await groupDatabase.select());
    await groupParticipantDatabase.addGroupParticipant("rr123456", 1);
    expect(await groupParticipantDatabase.selectGroupParticipant()).toEqual([
      {
        employeeId: "rr123456",
        groupId: 1,
        id: 1,
      },
    ]);
  });
});

describe("引数間違い", () => {
  it("その１", async () => {
    expect.assertions(1);
    await groupParticipantDatabase.addGroupParticipant(1);
    expect(await groupParticipantDatabase.selectGroupParticipant()).toEqual([]);
  });
  it("その２", async () => {
    expect.assertions(1);
    await groupParticipantDatabase.addGroupParticipant("noooooo", "yeeees");
    expect(await groupParticipantDatabase.selectGroupParticipant()).toEqual([]);
  });
});
