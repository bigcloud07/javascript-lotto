export default class WebView {
  constructor({
    purchaseInput,
    purchaseForm,
    resultForm,
    lottoCount,
    lottoDetails,
    lottoList,
    modal,
    modalClose,
    modalBackdrop,
    statsBody,
    profitRate,
    restartButton,
    winningNumberInputs,
    bonusInput,
  }) {
    this.purchaseInput = purchaseInput;
    this.purchaseForm = purchaseForm;
    this.resultForm = resultForm;
    this.lottoCount = lottoCount;
    this.lottoDetails = lottoDetails;
    this.lottoList = lottoList;
    this.modal = modal;
    this.modalClose = modalClose;
    this.modalBackdrop = modalBackdrop;
    this.statsBody = statsBody;
    this.profitRate = profitRate;
    this.restartButton = restartButton;
    this.winningNumberInputs = Array.from(winningNumberInputs);
    this.bonusInput = bonusInput;
  }

  onPurchaseSubmit(handler) {
    this.purchaseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }

  onResultSubmit(handler) {
    this.resultForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
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
    this.winningNumberInputs.forEach((input) => {
      input.value = "";
    });

    this.bonusInput.value = "";

    this.lottoCount.innerText = "";
    this.lottoCount.classList.remove("error");
    this.lottoDetails.classList.add("is-hidden");
    this.lottoList.innerHTML = "";
    this.hideModal();
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
      { key: 6, label: "6개" },
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
