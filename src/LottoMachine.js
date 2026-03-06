import { LOTTO_RULE } from "./constants.js";
import Lotto from "./Lotto.js";

export default class LottoMachine {
  constructor(purchaseAmount) {
    this.lottoCount = purchaseAmount / LOTTO_RULE.LOTTO_PRICE;
    this.lottos = [];
  }

  generateLottoNumbers(min, max, count) {
    const lottoNumbers = new Set();

    while (lottoNumbers.size < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      lottoNumbers.add(randomNumber);
    }

    return Array.from(lottoNumbers).sort((a, b) => a - b);
  }

  issuedLottos() {
    Array.from({ length: this.lottoCount }).forEach(() => {
      const lottoNumbers = this.generateLottoNumbers(1, 45, 6);
      const lotto = new Lotto(lottoNumbers);
      this.lottos.push(lotto);
    });

    return this.lottos;
  }

  printIssuedLottos() {
    this.lottos.forEach((lotto) => {
      console.log(lotto.getNumbers());
    });
  }

  run() {
    this.issuedLottos();
    this.printIssuedLottos();

    return this.lottos;
  }
}
