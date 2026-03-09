/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LOTTO_RULE } from "./constants.js";
import InputView from "./view/InputView.js";
import LottoMachine from "./model/LottoMachine.js";
import Profit from "./model/Profit.js";
import Rank from "./model/Rank.js";
import OutputView from "./view/OutputView.js";

class App {
  async run() {
    const purchasedAmount = await InputView.readPurchaseAmount();
    const lottoCount = purchasedAmount / LOTTO_RULE.LOTTO_PRICE;

    console.log(`${lottoCount}개를 구매했습니다.`);
    const lottoMachine = new LottoMachine(purchasedAmount);
    const lottos = lottoMachine.issuedLottos();

    OutputView.printIssuedLottos(lottos);

    const winningNumbers = await InputView.readWinningNumbers();
    const bonusNumbers = await InputView.readBonusNumbers();

    const rank = new Rank(lottos, winningNumbers, bonusNumbers);
    rank.calculateStats();
    OutputView.printStats(rank.getStats());

    const profitRate = Profit.calculateProfit(purchasedAmount, rank.getStats());
    OutputView.printProfitRate(profitRate);

    this.checkRestart();
  }

  async checkRestart() {
    const command = await InputView.askRestart();

    if (command === "y") {
      return this.run();
    }

    return InputView.close();
  }
}

const app = new App();
app.run();
