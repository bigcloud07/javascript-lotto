import { LOTTO_RANK_RULES, OUTPUT_MESSAGES } from "../constants.js";

export default class OutputView {
    static printStats(stats) {
        console.log("\n" + OUTPUT_MESSAGES.STATS_HEADER);

        Object.entries(stats).forEach(([key, { count, prize }]) => {
            const displayKey =
                key === LOTTO_RANK_RULES["5_BONUS_MATCH"]
                    ? OUTPUT_MESSAGES["5_BONUS_MATCH"]
                    : `${key}개 일치`;

            console.log(`${displayKey} (${prize.toLocaleString()}원) - ${count}개`);
        });
    }

    static printIssuedLottos(lottos) {
        lottos.forEach((lotto) => {
            console.log(lotto.getNumbers());
        });
    }

    static printProfitRate(profitRate) {
        console.log(`${OUTPUT_MESSAGES.PROFIT_RATE_PREFIX}${profitRate}${OUTPUT_MESSAGES.PROFIT_RATE_SUFFIX}`);
    }

    static purchasedLottoCount(count) {
        console.log(`${count}${OUTPUT_MESSAGES.PURCHASE_SUFFIX}`);
    }
}