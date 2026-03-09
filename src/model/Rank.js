import { LOTTO_RULE, OUTPUT_MESSAGES } from "../constants";

export default class Rank {
  constructor(lottos, winningNumbers, bonusNumbers) {
    this.lottos = lottos;
    this.winningNumbers = winningNumbers;
    this.bonusNumbers = bonusNumbers;
    this.stats = {
      [LOTTO_RULE["3_MATCH"]]: { count: 0, prize: 5000 },
      [LOTTO_RULE["4_MATCH"]]: { count: 0, prize: 50000 },
      [LOTTO_RULE["5_MATCH"]]: { count: 0, prize: 1500000 },
      [LOTTO_RULE["5_BONUS_MATCH"]]: { count: 0, prize: 30000000 },
      [LOTTO_RULE["6_MATCH"]]: { count: 0, prize: 2000000000 },
    };
  }

  getStats() {
    return this.stats;
  }

  // 결과 계산
  calculateStats() {
    this.lottos.forEach((lotto) => {
      const matchCount = lotto.calculateMatchCount(this.winningNumbers);

      if (matchCount < LOTTO_RULE["3_MATCH"]) return;

      if (
        matchCount === LOTTO_RULE["5_MATCH"] &&
        lotto.hasBonusNumber(this.bonusNumbers)
      ) {
        this.stats[LOTTO_RULE["5_BONUS_MATCH"]].count += 1;
      } else if (Object.keys(this.stats).includes(String(matchCount))) {
        this.stats[matchCount].count += 1;
      }
    });
  }

  // 결과 출력
  printStats() {
    this.calculateStats();

    console.log("\n" + OUTPUT_MESSAGES.STATS_HEADER);

    Object.entries(this.stats).forEach(([key, { count, prize }]) => {
      const displayKey =
        key === LOTTO_RULE["5_BONUS_MATCH"]
          ? OUTPUT_MESSAGES["5_BONUS_MATCH"]
          : `${key}개 일치`;

      console.log(`${displayKey} (${prize.toLocaleString()}원) - ${count}개`);
    });
  }
}
