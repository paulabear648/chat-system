const employeeDatabase = require("../../db/employeeDatabase");
const employeeIdDatabase = require("../../db/employeeIdDatabase");
const initAllDb = require("../../db/initializer/initAllDb");
const positionDatabase = require("../../db/positionDatabase");

beforeEach(async () => {
  await initAllDb();
  await employeeIdDatabase.addEmployeeId("ee111111");
  await employeeIdDatabase.addEmployeeId("ee111112");
  await employeeIdDatabase.addEmployeeId("ee111113");
  await positionDatabase.addPosition(2, "manager");
});

afterEach(async () => {
  await initAllDb();
});

describe("select", () => {
  it("データの読み込み", async () => {
    expect.assertions(1);
    await employeeDatabase.addEmployee("ee111111", "fumito", "hello0000", 2);
    expect(JSON.stringify(await employeeDatabase.select())).toMatch(
      new RegExp('"id":"ee111111","name":"fumito","password":', "u")
    );
  });
});

describe("selectName", () => {
  it("名前のみの読み込み", async () => {
    expect.assertions(1);
    await employeeDatabase.addEmployee("ee111111", "fumito", "hello0000", 2);
    expect(
      JSON.stringify(await employeeDatabase.selectNameById("ee111111"))
    ).toMatch(new RegExp('"name":"fumito"', "u"));
  });
  it("多くの挿入後の名前のみの読み込み", async () => {
    expect.assertions(1);
    await employeeDatabase.addEmployee("ee111111", "fumito", "hello0000", 2);
    await employeeDatabase.addEmployee("ee111112", "taro", "hello0000", 2);
    await employeeDatabase.addEmployee("ee111113", "jiro", "hello0000", 2);
    expect(
      JSON.stringify(await employeeDatabase.selectNameById("ee111112"))
    ).toMatch(new RegExp('"name":"taro"', "u"));
  });
  it("存在しないIDの読み込み", async () => {
    expect.assertions(1);
    await employeeDatabase.addEmployee("ee111111", "fumito", "hello0000", 2);
    await employeeDatabase.addEmployee("ee111112", "taro", "hello0000", 2);
    await employeeDatabase.addEmployee("ee111113", "jiro", "hello0000", 2);
    expect(
      JSON.stringify(await employeeDatabase.selectNameById("ee111114"))
    ).toMatch("null");
  });
});
