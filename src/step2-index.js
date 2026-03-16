/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import LottoMachine from "./model/LottoMachine.js";
import Profit from "./model/Profit.js";
import Rank from "./model/Rank.js";
import { ERROR_MESSAGES, LOTTO_RANK_RULES } from "./constants.js";
import { InputValidator } from "./utils/validator.js";

class App {
    constructor() {
        this.lottos = [];
        this.purchaseAmount = 0;
    }

    run() {
        const purchasedAmountInput = document.getElementById("purchaseinput");
        const purchaseForm = document.getElementById("purchaseForm");
        const resultButton = document.getElementById("resultButton");
        const lottoCountElement = document.getElementById("lottoCount");
        const lottoDetailsElement = document.getElementById("lottoDetails");
        const lottoListElement = this.createLottoListElement();
        const modalElement = document.getElementById("resultModal");
        const modalCloseButton = document.getElementById("modalClose");
        const modalBackdrop = document.getElementById("modalBackdrop");
        const statsBody = document.getElementById("statsBody");
        const profitRateElement = document.getElementById("profitRate");
        const restartButton = document.getElementById("restartButton");

        purchaseForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const purchaseAmount = purchasedAmountInput.value;

            try {
                InputValidator.validatePurchaseAmount(purchaseAmount);

                const lottoMachine = new LottoMachine(Number(purchaseAmount));
                const lottos = lottoMachine.issuedLottos();

                this.lottos = lottos;
                this.purchaseAmount = Number(purchaseAmount);

                lottoCountElement.classList.remove("error");
                lottoDetailsElement.classList.remove("is-hidden");
                this.renderLottoCount(lottoCountElement, lottos.length);
                this.renderLottos(lottoListElement, lottos);
            } catch (error) {
                this.lottos = [];
                this.purchaseAmount = 0;
                lottoCountElement.classList.add("error");
                lottoDetailsElement.classList.add("is-hidden");
                lottoCountElement.innerText = error.message;
                lottoListElement.innerHTML = "";
            }
        });

        resultButton.addEventListener("click", () => {
            try {
                if (this.lottos.length === 0) {
                    throw new Error(ERROR_MESSAGES.PURCHASE_AMOUNT.EMPTY);
                }

                const winningNumbers = this.getWinningNumbers();
                const bonusNumber = this.getBonusNumber(winningNumbers);

                const rank = new Rank(this.lottos, winningNumbers, [bonusNumber]);
                const stats = rank.calculateStats();
                const profitRate = Profit.calculateProfit(this.purchaseAmount, stats);

                this.renderStats(statsBody, stats);
                profitRateElement.innerText = profitRate;
                this.showModal(modalElement);
            } catch (error) {
                lottoCountElement.classList.add("error");
                lottoCountElement.innerText = error.message;
                this.hideModal(modalElement);
            }
        });

        restartButton.addEventListener("click", () => {
            this.resetView({
                purchasedAmountInput,
                lottoCountElement,
                lottoDetailsElement,
                lottoListElement,
                modalElement,
            });
        });

        modalCloseButton.addEventListener("click", () => {
            this.hideModal(modalElement);
        });

        modalBackdrop.addEventListener("click", () => {
            this.hideModal(modalElement);
        });
    }

    createLottoListElement() {
        const lottoCountElement = document.getElementById("lottoCount");
        const lottoListElement = document.createElement("div");

        lottoListElement.id = "issued-lottos";
        lottoCountElement.insertAdjacentElement("afterend", lottoListElement);

        return lottoListElement;
    }

    renderLottoCount(lottoCountElement, count) {
        lottoCountElement.innerText = `총 ${count}개를 구매했습니다.`;
    }

    renderLottos(lottoListElement, lottos) {
        lottoListElement.innerHTML = "";

        lottos.forEach((lotto) => {
            const lottoElement = document.createElement("p");
            lottoElement.innerText = `🎟️ ${lotto.getNumbers().join(", ")}`;
            lottoListElement.appendChild(lottoElement);
        });
    }

    getWinningNumbers() {
        const inputs = Array.from(document.querySelectorAll(".winning-numbers .number-input"));
        const values = inputs.map((input) => input.value.trim());

        if (values.some((value) => value === "")) {
            throw new Error(ERROR_MESSAGES.WINNING_NUMBERS.EMPTY);
        }

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

    renderStats(statsBody, stats) {
        const rows = [
            { key: LOTTO_RANK_RULES["3_MATCH"], label: "3개" },
            { key: LOTTO_RANK_RULES["4_MATCH"], label: "4개" },
            { key: LOTTO_RANK_RULES["5_MATCH"], label: "5개" },
            { key: LOTTO_RANK_RULES["5_BONUS_MATCH"], label: "5개+보너스볼" },
            { key: LOTTO_RANK_RULES["6_MATCH"], label: "6개" },
        ];

        statsBody.innerHTML = "";
        rows.forEach(({ key, label }) => {
            const row = document.createElement("tr");
            const matchCell = document.createElement("td");
            const prizeCell = document.createElement("td");
            const countCell = document.createElement("td");

            matchCell.innerText = label;
            prizeCell.innerText = stats[key].prize.toLocaleString();
            countCell.innerText = `${stats[key].count}개`;

            row.appendChild(matchCell);
            row.appendChild(prizeCell);
            row.appendChild(countCell);
            statsBody.appendChild(row);
        });
    }

    showModal(modalElement) {
        modalElement.classList.remove("is-hidden");
    }

    hideModal(modalElement) {
        modalElement.classList.add("is-hidden");
    }

    resetView({ purchasedAmountInput, lottoCountElement, lottoDetailsElement, lottoListElement, modalElement }) {
        this.lottos = [];
        this.purchaseAmount = 0;

        purchasedAmountInput.value = "";
        lottoCountElement.innerText = "";
        lottoCountElement.classList.remove("error");
        lottoDetailsElement.classList.add("is-hidden");
        lottoListElement.innerHTML = "";

        document.querySelectorAll(".winning-numbers .number-input").forEach((input) => {
            input.value = "";
        });

        const bonusInput = document.querySelector(".bonus-number .number-input");
        if (bonusInput) {
            bonusInput.value = "";
        }

        this.hideModal(modalElement);
    }
}

const app = new App();
app.run();
