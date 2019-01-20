import ReduxStore from "./ReduxStore";

describe("Redux Store", () => {
  it("smoke test", () => {
    console.log(ReduxStore(() => {}));
    expect(true).toBe(true);
  });
});
