const initAllDb = require("../../db/initializer/initAllDb");
const positionDatabase = require("../../db/positionDatabase");

beforeEach(async () => {
  await initAllDb();
});

afterEach(async () => {
  await initAllDb();
});

describe("insert and select entire positions", () => {
  it("役職の挿入と全ての役職の読み込み", async () => {
    expect.assertions(1);
    await positionDatabase.addPosition(0, "manager");
    expect(await positionDatabase.selectPosition()).toEqual([
      { id: 0, name: "manager" },
    ]);
  });
});

describe("syncForce positions", () => {
  it("役職テーブルの初期化", async () => {
    expect.assertions(1);
    await positionDatabase.syncForce();
    expect(await positionDatabase.selectPosition()).toEqual([]);
  });
});

describe("insert with wrong numbers of args", () => {
  it("引数間違い", async () => {
    expect.assertions(1);
    await positionDatabase.addPosition(0);
    expect(await positionDatabase.selectPosition()).toEqual([]);
  });
  it("引数間違い　その２", async () => {
    expect.assertions(1);
    await positionDatabase.addPosition();
    expect(await positionDatabase.selectPosition()).toEqual([]);
  });
});
