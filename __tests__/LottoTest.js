describe("당첨 번호 비교 test", () => {
  test("일치 개수가 3개일 때", () => {
    expect(
      new Lotto([1, 2, 3, 4, 5, 6]).calculateMatchCount([1, 2, 3, 7, 8, 9])
    ).toBe(3);
  });
  test("일치 개수가 4개일 때", () => {
    expect(
      new Lotto([1, 2, 3, 4, 5, 6]).calculateMatchCount([1, 2, 3, 4, 8, 9])
    ).toBe(4);
  });
  test("일치 개수가 5개일 때", () => {
    expect(
      new Lotto([1, 2, 3, 4, 5, 6]).calculateMatchCount([1, 2, 3, 4, 5, 9])
    ).toBe(5);
  });
  test("일치 개수가 6개일 때", () => {
    expect(
      new Lotto([1, 2, 3, 4, 5, 6]).calculateMatchCount([1, 2, 3, 4, 5, 6])
    ).toBe(6);
  });
});

describe("당첨 번호 및 보너스 번호 비교 test", () => {
  test("5개 일치, 보너스 볼 일치", () => {
    expect(new Lotto([1, 2, 3, 4, 5, 6]))
      .calculateMatchCount([1, 2, 3, 4, 5, 11, 6])
      .toBe(6);
  });
});
