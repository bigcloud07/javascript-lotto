import { LOTTO_RULE } from "../src/constants.js";
import Profit from "../src/model/Profit.js";

test("수익률 계산 test", () => {
  const purchasedAmount = 1000;

  const stats = {
    [LOTTO_RULE["3_MATCH"]]: { count: 2, prize: 5000 },
    [LOTTO_RULE["4_MATCH"]]: { count: 0, prize: 50000 },
    [LOTTO_RULE["5_MATCH"]]: { count: 0, prize: 1500000 },
    [LOTTO_RULE["5_BONUS_MATCH"]]: { count: 0, prize: 30000000 },
    [LOTTO_RULE["6_MATCH"]]: { count: 0, prize: 2000000000 },
  };

  const profitRate = Profit.calculateProfit(purchasedAmount, stats);

  expect(profitRate).toBe(1000.0);
});
