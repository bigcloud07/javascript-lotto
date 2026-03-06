import { INPUT_MESSAGES } from "./constants";

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default class InputView {
  static read(query) {
    return new Promise((resolve) => {
      rl.question(query, (answer) => {
        resolve(answer);
      });
    });
  }

  static close() {
    rl.close();
  }

  static async readPurchaseAmount() {
    return InputView.read(INPUT_MESSAGES.PURCHASE_AMOUNT);
  }

  static readWinningNumbers() {
    return InputView.read(INPUT_MESSAGES.WINNING_NUMBERS);
  }

  static readBonusNumbers() {
    return InputView.read(INPUT_MESSAGES.BONNUS_NUMBERS);
  }
}
