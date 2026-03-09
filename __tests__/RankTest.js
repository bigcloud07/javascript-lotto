import Lotto from "../src/model/Lotto.js";
import Rank from "../src/model/Rank.js";
import OutputView from "../src/view/OutputView.js";

const getLogSpy = () => {
  const logSpy = jest.spyOn(console, "log");
  logSpy.mockClear();
  return logSpy;
};

describe("당첨 통계 출력 test", () => {
  const logSpy = getLogSpy();
  const lottos = [
    new Lotto([8, 21, 23, 41, 42, 43]),
    new Lotto([3, 5, 11, 16, 32, 38]),
    new Lotto([7, 11, 16, 35, 36, 44]),
    new Lotto([1, 8, 11, 31, 41, 42]),
    new Lotto([13, 14, 16, 38, 42, 45]),
    new Lotto([7, 11, 30, 40, 42, 43]),
    new Lotto([2, 13, 22, 32, 38, 45]),
    new Lotto([1, 2, 3, 14, 22, 45]),
  ];

  test.each([
    [
      "5등 (3개 일치) - 1개",
      [1, 2, 3, 4, 5, 6],
      [7],
      [
        "3개 일치 (5,000원) - 1개",
        "4개 일치 (50,000원) - 0개",
        "5개 일치 (1,500,000원) - 0개",
        "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
        "6개 일치 (2,000,000,000원) - 0개",
      ],
    ],
    [
      "4등 (4개 일치) - 1개",
      [1, 2, 3, 14, 5, 6],
      [7],
      [
        "3개 일치 (5,000원) - 0개",
        "4개 일치 (50,000원) - 1개",
        "5개 일치 (1,500,000원) - 0개",
        "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
        "6개 일치 (2,000,000,000원) - 0개",
      ],
    ],
    [
      "3등 (5개 일치) - 1개",
      [1, 2, 3, 14, 22, 6],
      [7],
      [
        "3개 일치 (5,000원) - 0개",
        "4개 일치 (50,000원) - 0개",
        "5개 일치 (1,500,000원) - 1개",
        "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
        "6개 일치 (2,000,000,000원) - 0개",
      ],
    ],
    [
      "2등 (5개 일치, 보너스 번호 일치) - 1개",
      [1, 2, 3, 14, 22, 6],
      [45],
      [
        "3개 일치 (5,000원) - 0개",
        "4개 일치 (50,000원) - 0개",
        "5개 일치 (1,500,000원) - 0개",
        "5개 일치, 보너스 볼 일치 (30,000,000원) - 1개",
        "6개 일치 (2,000,000,000원) - 0개",
      ],
    ],
    [
      "1등 (6개 일치) - 1개",
      [1, 2, 3, 14, 22, 45],
      [7],
      [
        "3개 일치 (5,000원) - 0개",
        "4개 일치 (50,000원) - 0개",
        "5개 일치 (1,500,000원) - 0개",
        "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
        "6개 일치 (2,000,000,000원) - 1개",
      ],
    ],
  ])("일치 내역: %s", (_, winningNumbers, bonusNumbers, logs) => {
    const stats = new Rank(lottos, winningNumbers, bonusNumbers).calculateStats();
    OutputView.printStats(stats);

    logs.forEach((log) =>
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log))
    );
  });
});
