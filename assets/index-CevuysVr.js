(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
class WebView {
  constructor() {
    this.purchaseInput = document.getElementById("purchaseinput");
    this.purchaseForm = document.getElementById("purchaseForm");
    this.resultButton = document.getElementById("resultButton");
    this.lottoCount = document.getElementById("lottoCount");
    this.lottoDetails = document.getElementById("lottoDetails");
    this.lottoList = this.createLottoListElement();
    this.modal = document.getElementById("resultModal");
    this.modalClose = document.getElementById("modalClose");
    this.modalBackdrop = document.getElementById("modalBackdrop");
    this.statsBody = document.getElementById("statsBody");
    this.profitRate = document.getElementById("profitRate");
    this.restartButton = document.getElementById("restartButton");
  }
  onPurchaseSubmit(handler) {
    this.purchaseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }
  onResultClick(handler) {
    this.resultButton.addEventListener("click", () => handler());
  }
  onRestartClick(handler) {
    this.restartButton.addEventListener("click", () => handler());
  }
  onModalClose(handler) {
    this.modalClose.addEventListener("click", () => handler());
    this.modalBackdrop.addEventListener("click", () => handler());
  }
  showPurchaseResult(count, lottos) {
    this.lottoDetails.classList.remove("is-hidden");
    this.lottoCount.classList.remove("error");
    this.lottoCount.innerText = `총 ${count}개를 구매했습니다.`;
    this.renderLottos(lottos);
  }
  showError(message) {
    this.lottoCount.classList.add("error");
    this.lottoCount.innerText = message;
  }
  showStats(stats, profitRate) {
    this.renderStats(stats);
    this.profitRate.innerText = profitRate;
    this.showModal();
  }
  showModal() {
    this.modal.classList.remove("is-hidden");
  }
  hideModal() {
    this.modal.classList.add("is-hidden");
  }
  reset() {
    this.purchaseInput.value = "";
    this.lottoCount.innerText = "";
    this.lottoCount.classList.remove("error");
    this.lottoDetails.classList.add("is-hidden");
    this.lottoList.innerHTML = "";
    this.hideModal();
    document.querySelectorAll(".winning-numbers .number-input").forEach((input) => {
      input.value = "";
    });
    const bonusInput = document.querySelector(".bonus-number .number-input");
    if (bonusInput) bonusInput.value = "";
  }
  createLottoListElement() {
    const lottoCountElement = document.getElementById("lottoCount");
    const lottoListElement = document.createElement("div");
    lottoListElement.id = "issued-lottos";
    lottoCountElement.insertAdjacentElement("afterend", lottoListElement);
    return lottoListElement;
  }
  renderLottos(lottos) {
    this.lottoList.innerHTML = "";
    lottos.forEach((lotto) => {
      const row = document.createElement("p");
      row.innerText = `🎟️ ${lotto.getNumbers().join(", ")}`;
      this.lottoList.appendChild(row);
    });
  }
  renderStats(stats) {
    this.statsBody.innerHTML = "";
    const rows = [
      { key: 3, label: "3개" },
      { key: 4, label: "4개" },
      { key: 5, label: "5개" },
      { key: "5개 번호 + 보너스 번호 일치", label: "5개+보너스볼" },
      { key: 6, label: "6개" }
    ];
    rows.forEach(({ key, label }) => {
      const { count, prize } = stats[key];
      const row = document.createElement("tr");
      const matchCell = document.createElement("td");
      const prizeCell = document.createElement("td");
      const countCell = document.createElement("td");
      matchCell.innerText = label;
      prizeCell.innerText = prize.toLocaleString();
      countCell.innerText = `${count}개`;
      row.appendChild(matchCell);
      row.appendChild(prizeCell);
      row.appendChild(countCell);
      this.statsBody.appendChild(row);
    });
  }
}
const LOTTO_RANK_RULES = Object.freeze({
  "3_MATCH": 3,
  "4_MATCH": 4,
  "5_MATCH": 5,
  "5_BONUS_MATCH": "5개 번호 + 보너스 번호 일치",
  "6_MATCH": 6
});
const LOTTO_PRICE = 1e3;
const ERROR_MESSAGES = Object.freeze({
  PURCHASE_AMOUNT: Object.freeze({
    EMPTY: "[ERROR] 구입 금액을 입력해 주세요.",
    NOT_NUMBER: "[ERROR] 구입 금액은 숫자여야 합니다.",
    NOT_POSITIVE: "[ERROR] 구입 금액은 0보다 큰 양수여야 합니다.",
    NOT_THOUSAND_UNIT: "[ERROR] 구입 금액은 1,000원 단위여야 합니다."
  }),
  WINNING_NUMBERS: Object.freeze({
    EMPTY: "[ERROR] 당첨 번호를 입력해 주세요.",
    NOT_SIX: "[ERROR] 당첨 번호는 6개여야 합니다.",
    NOT_NUMBER: "[ERROR] 당첨 번호는 모두 숫자여야 합니다.",
    OUT_OF_RANGE: "[ERROR] 당첨 번호는 1부터 45 사이의 숫자여야 합니다.",
    DUPLICATED: "[ERROR] 당첨 번호는 중복될 수 없습니다."
  }),
  BONUS_NUMBER: Object.freeze({
    EMPTY: "[ERROR] 보너스 번호를 입력해 주세요.",
    NOT_NUMBER: "[ERROR] 보너스 번호는 숫자여야 합니다.",
    OUT_OF_RANGE: "[ERROR] 보너스 번호는 1부터 45 사이의 숫자여야 합니다.",
    DUPLICATED: "[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다."
  })
});
const InputValidator = {
  validatePurchaseAmount(input) {
    if (!input || input.trim() === "") {
      throw new Error(ERROR_MESSAGES.PURCHASE_AMOUNT.EMPTY);
    }
    const amount = Number(input);
    if (Number.isNaN(amount)) {
      throw new Error(ERROR_MESSAGES.PURCHASE_AMOUNT.NOT_NUMBER);
    }
    if (amount <= 0) {
      throw new Error(ERROR_MESSAGES.PURCHASE_AMOUNT.NOT_POSITIVE);
    }
    if (amount % 1e3 !== 0) {
      throw new Error(ERROR_MESSAGES.PURCHASE_AMOUNT.NOT_THOUSAND_UNIT);
    }
  },
  validateWinningNumbers(input) {
    if (!input || input.trim() === "") {
      throw new Error(ERROR_MESSAGES.WINNING_NUMBERS.EMPTY);
    }
    const numbers = input.split(",").map((num) => Number(num.trim()));
    if (numbers.length !== 6) {
      throw new Error(ERROR_MESSAGES.WINNING_NUMBERS.NOT_SIX);
    }
    if (numbers.some((num) => Number.isNaN(num))) {
      throw new Error(ERROR_MESSAGES.WINNING_NUMBERS.NOT_NUMBER);
    }
    if (numbers.some((num) => num < 1 || num > 45)) {
      throw new Error(ERROR_MESSAGES.WINNING_NUMBERS.OUT_OF_RANGE);
    }
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== 6) {
      throw new Error(ERROR_MESSAGES.WINNING_NUMBERS.DUPLICATED);
    }
  },
  validateBonusNumber(input, winningNumbers) {
    if (!input || input.trim() === "") {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER.EMPTY);
    }
    const bonusNumber = Number(input.trim());
    if (Number.isNaN(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER.NOT_NUMBER);
    }
    if (bonusNumber < 1 || bonusNumber > 45) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER.OUT_OF_RANGE);
    }
    if (winningNumbers.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER.DUPLICATED);
    }
  }
};
class WebInput {
  getPurchaseAmount() {
    const purchaseInput = document.getElementById("purchaseinput");
    const purchaseAmount = purchaseInput ? purchaseInput.value.trim() : "";
    InputValidator.validatePurchaseAmount(purchaseAmount);
    return Number(purchaseAmount);
  }
  getWinningNumbers() {
    const inputs = Array.from(document.querySelectorAll(".winning-numbers .number-input"));
    const values = inputs.map((input) => input.value.trim());
    const inputString = values.join(",");
    InputValidator.validateWinningNumbers(inputString);
    return values.map((value) => Number(value));
  }
  getBonusNumber(winningNumbers) {
    const bonusInput = document.querySelector(".bonus-number .number-input");
    const bonusValue = bonusInput ? bonusInput.value.trim() : "";
    InputValidator.validateBonusNumber(bonusValue, winningNumbers);
    return Number(bonusValue);
  }
}
class Lotto {
  #numbers;
  constructor(lottoNumbers) {
    this.#numbers = lottoNumbers;
  }
  getNumbers() {
    return [...this.#numbers];
  }
  calculateMatchCount(targetNumbers) {
    return this.#numbers.filter((number) => targetNumbers.includes(number)).length;
  }
  hasBonusNumber(bonusNumbers) {
    return bonusNumbers.some(
      (bonusNumber) => this.#numbers.includes(bonusNumber)
    );
  }
}
class LottoMachine {
  constructor(purchaseAmount) {
    this.lottoCount = purchaseAmount / LOTTO_PRICE;
    this.lottos = [];
  }
  generateLottoNumbers(min, max, count) {
    const lottoNumbers = /* @__PURE__ */ new Set();
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
}
class Profit {
  static sumPrize(stats) {
    const totalPrize = Object.values(stats).reduce(
      (sum, { count, prize }) => sum + count * prize,
      0
    );
    return totalPrize;
  }
  static calculateProfit(purchasedAmount, stats) {
    const totalPrize = this.sumPrize(stats);
    return Number((totalPrize / purchasedAmount * 100).toFixed(1));
  }
}
class Rank {
  constructor(lottos, winningNumbers, bonusNumbers) {
    this.lottos = lottos;
    this.winningNumbers = winningNumbers;
    this.bonusNumbers = bonusNumbers;
    this.stats = {
      [LOTTO_RANK_RULES["3_MATCH"]]: { count: 0, prize: 5e3 },
      [LOTTO_RANK_RULES["4_MATCH"]]: { count: 0, prize: 5e4 },
      [LOTTO_RANK_RULES["5_MATCH"]]: { count: 0, prize: 15e5 },
      [LOTTO_RANK_RULES["5_BONUS_MATCH"]]: { count: 0, prize: 3e7 },
      [LOTTO_RANK_RULES["6_MATCH"]]: { count: 0, prize: 2e9 }
    };
  }
  calculateStats() {
    this.lottos.forEach((lotto) => {
      const matchCount = lotto.calculateMatchCount(this.winningNumbers);
      if (matchCount < LOTTO_RANK_RULES["3_MATCH"]) return;
      if (matchCount === LOTTO_RANK_RULES["5_MATCH"] && lotto.hasBonusNumber(this.bonusNumbers)) {
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
class App {
  constructor() {
    this.view = new WebView();
    this.input = new WebInput();
    this.lottos = [];
    this.purchaseAmount = 0;
  }
  run() {
    this.view.onPurchaseSubmit(() => {
      try {
        const purchaseAmount = this.input.getPurchaseAmount();
        const lottoMachine = new LottoMachine(purchaseAmount);
        this.lottos = lottoMachine.issuedLottos();
        this.purchaseAmount = purchaseAmount;
        this.view.showPurchaseResult(this.lottos.length, this.lottos);
      } catch (error) {
        this.lottos = [];
        this.purchaseAmount = 0;
        this.view.showError(error.message);
      }
    });
    this.view.onResultClick(() => {
      try {
        if (this.lottos.length === 0) {
          throw new Error(ERROR_MESSAGES.PURCHASE_AMOUNT.EMPTY);
        }
        const winningNumbers = this.input.getWinningNumbers();
        const bonusNumber = this.input.getBonusNumber(winningNumbers);
        const rank = new Rank(this.lottos, winningNumbers, [bonusNumber]);
        const stats = rank.calculateStats();
        const profitRate = Profit.calculateProfit(this.purchaseAmount, stats);
        this.view.showStats(stats, profitRate);
      } catch (error) {
        this.view.showError(error.message);
        this.view.hideModal();
      }
    });
    this.view.onRestartClick(() => {
      this.lottos = [];
      this.purchaseAmount = 0;
      this.view.reset();
    });
    this.view.onModalClose(() => {
      this.view.hideModal();
    });
  }
}
const app = new App();
app.run();
