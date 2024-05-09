const employeeIdDatabase = require("../../db/employeeIdDatabase");
const initAllDb = require("../../db/initializer/initAllDb");

beforeEach(async () => {
  await initAllDb();
});

afterEach(async () => {
  await initAllDb();
});

describe("insert and select entire employeeIds", () => {
  it("社員IDの挿入と全ての社員IDの読み込み", async () => {
    expect.assertions(1);
    await employeeIdDatabase.addEmployeeId("rr123456");
    expect(await employeeIdDatabase.selectEntireId()).toEqual([
      { id: "rr123456" },
    ]);
  });
});

describe("syncForce", () => {
  it("社員IDテーブルの初期化", async () => {
    expect.assertions(1);
    await employeeIdDatabase.syncForce();
    expect(await employeeIdDatabase.selectEntireId()).toEqual([]);
  });
});

describe("insert with wrong numbers of args", () => {
  it("引数間違い", async () => {
    expect.assertions(1);
    await employeeIdDatabase.addEmployeeId();
    expect(await employeeIdDatabase.selectEntireId()).toEqual([]);
  });
  it("引数間違い　その２", async () => {
    expect.assertions(1);
    await employeeIdDatabase.addEmployeeId(0);
    expect(await employeeIdDatabase.selectEntireId()).toEqual([]);
  });
  it("引数間違い　その３", async () => {
    expect.assertions(1);
    await employeeIdDatabase.addEmployeeId(1, "manager", "wrong");
    expect(await employeeIdDatabase.selectEntireId()).toEqual([]);
  });
});
