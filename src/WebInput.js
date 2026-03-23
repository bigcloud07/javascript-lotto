import { InputValidator } from "./utils/validator.js";

export default class WebInput {
  constructor({ purchaseInput, winningNumberInputs, bonusInput }) {
    this.purchaseInput = purchaseInput;
    this.winningNumberInputs = Array.from(winningNumberInputs);
    this.bonusInput = bonusInput;
  }

  getPurchaseAmount() {
    const purchaseAmount = this.purchaseInput.value.trim();
    InputValidator.validatePurchaseAmount(purchaseAmount);

    return Number(purchaseAmount);
  }

  getWinningNumbers() {
    const winningValues = this.winningNumberInputs.map((input) => input.value.trim());
    const inputString = winningValues.join(",");
    InputValidator.validateWinningNumbers(inputString);

    return winningValues.map((value) => Number(value));
  }

  getBonusNumber(winningNumbers) {
    const bonusValue = this.bonusInput.value.trim();
    InputValidator.validateBonusNumber(bonusValue, winningNumbers);

    return Number(bonusValue);
  }
}
