const initAllDb = require("../../db/initializer/initAllDb");
const groupDatabase = require("../../db/groupDatabase");

beforeEach(async () => {
  await initAllDb();
});

afterEach(async () => {
  await initAllDb();
});

describe("group_select", () => {
  it("groupにgroupが入力された際のデータの読み込み", async () => {
    expect.assertions(1);
    await groupDatabase.insert("teamA", "group");
    expect(JSON.stringify(await groupDatabase.select())).toMatch(
      new RegExp('"id":1,"name":"teamA"', "u")
    );
  });
  it("groupにallが入力された際のデータの読み込み", async () => {
    expect.assertions(1);
    await groupDatabase.insert("zentai", "all");
    expect(JSON.stringify(await groupDatabase.select())).toMatch(
      new RegExp('"id":1,"name":"zentai"', "u")
    );
  });
  it("groupにprivateが入力された際のデータの読み込み", async () => {
    expect.assertions(1);
    await groupDatabase.insert("employeeA", "private");
    expect(JSON.stringify(await groupDatabase.select())).toMatch(
      new RegExp('"id":1,"name":"employeeA"', "u")
    );
  });

  it("groupに上の3種以外が入力された際のデータの読み込み", async () => {
    expect.assertions(1);
    await groupDatabase.insert("teamA", "group");
    await groupDatabase.insert("sada", "ghost");
    await groupDatabase.insert("employeeB", "private");
    expect(JSON.stringify(await groupDatabase.select())).not.toMatch(
      new RegExp('"name":"sada","type":"ghost","id":2', "u")
    );
  });
});

describe("insert", () => {
  it("groupにgroupが入力された際のデータの追加", async () => {
    expect.assertions(1);

    expect(
      JSON.stringify(await groupDatabase.insert("teamA", "group"))
    ).toMatch(new RegExp('"id":1,"name":"teamA"', "u"));
  });
  it("groupにallが入力された際のデータの追加", async () => {
    expect.assertions(1);

    expect(JSON.stringify(await groupDatabase.insert("zentai", "all"))).toMatch(
      new RegExp('"id":1,"name":"zentai"', "u")
    );
  });
  it("groupにprivateが入力された際のデータの追加", async () => {
    expect.assertions(1);

    expect(
      JSON.stringify(await groupDatabase.insert("employeeA", "private"))
    ).toMatch(new RegExp('"id":1,"name":"employeeA"', "u"));
  });

  it("groupに上の3種以外が入力された際のデータの追加", async () => {
    expect.assertions(1);

    expect(
      JSON.stringify(await groupDatabase.insert("sada", "ghost"))
    ).not.toMatch(new RegExp('"id":1,"name":"sada","type":"ghost"', "u"));
  });
});

describe("selectGroupName", () => {
  it("groupIdからgroupNameの取得", async () => {
    expect.assertions(1);
    await groupDatabase.insert("groupA", "group");
    expect(JSON.stringify(await groupDatabase.selectGroupName(1))).toMatch(
      new RegExp('"name":"groupA"', "u")
    );
  });
  it("存在しないgroupIdからgroupNameの取得", async () => {
    expect.assertions(1);
    await groupDatabase.insert("groupA", "group");
    expect(await groupDatabase.selectGroupName(2)).toEqual([]);
  });
});
