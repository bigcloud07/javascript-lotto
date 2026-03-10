import { LOTTO_RANK_RULES, OUTPUT_MESSAGES } from "../constants.js";

export default class Rank {
  constructor(lottos, winningNumbers, bonusNumbers) {
    this.lottos = lottos;
    this.winningNumbers = winningNumbers;
    this.bonusNumbers = bonusNumbers;
    this.stats = {
      [LOTTO_RANK_RULES["3_MATCH"]]: { count: 0, prize: 5000 },
      [LOTTO_RANK_RULES["4_MATCH"]]: { count: 0, prize: 50000 },
      [LOTTO_RANK_RULES["5_MATCH"]]: { count: 0, prize: 1500000 },
      [LOTTO_RANK_RULES["5_BONUS_MATCH"]]: { count: 0, prize: 30000000 },
      [LOTTO_RANK_RULES["6_MATCH"]]: { count: 0, prize: 2000000000 },
    };
  }

  calculateStats() {
    this.lottos.forEach((lotto) => {
      const matchCount = lotto.calculateMatchCount(this.winningNumbers);

      if (matchCount < LOTTO_RANK_RULES["3_MATCH"]) return;

      if (
        matchCount === LOTTO_RANK_RULES["5_MATCH"] &&
        lotto.hasBonusNumber(this.bonusNumbers)
      ) {
        this.stats[LOTTO_RANK_RULES["5_BONUS_MATCH"]].count += 1;
      } else if (Object.keys(this.stats).includes(String(matchCount))) {
        this.stats[matchCount].count += 1;
      }
    });
    return this.stats;
  }

  getStats() {
    return this.stats;
  }
}
