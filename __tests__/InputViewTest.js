import InputView from "../src/InputView.js";

describe("입력 기능 test", () => {
  afterAll(() => {
    InputView.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('사용자가 8000을 입력하면 "8000"을 반환해야 한다.', async () => {
    const readSpy = jest
      .spyOn(InputView, "readPurchaseAmount")
      .mockResolvedValueOnce("8000");

    const result = await InputView.readPurchaseAmount(
      "구입금액을 입력해 주세요.\n"
    );

    expect(result).toBe("8000");
    expect(readSpy).toHaveBeenCalledWith("구입금액을 입력해 주세요.\n");
  });
});
