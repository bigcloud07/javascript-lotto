import { INPUT_MESSAGES } from "./constants.js";
import readline from "readline";

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

  static async readValidInput(query) {
    try {
      const input = await InputView.read(query);

      // TODO: 입력값 검증 로직 추가

      return input;
    } catch (err) {
      console.log("[ERROR]");
      return await InputView.readValidInput(query);
    }
  }

  static close() {
    rl.close();
  }

  static async readPurchaseAmount() {
    return InputView.readValidInput(INPUT_MESSAGES.PURCHASE_AMOUNT);
  }

  static readWinningNumbers() {
    return InputView.readValidInput(INPUT_MESSAGES.WINNING_NUMBERS);
  }

  static readBonusNumbers() {
    return InputView.readValidInput(INPUT_MESSAGES.BONNUS_NUMBERS);
  }
}
