import { INPUT_MESSAGES } from "../constants.js";
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
    return await InputView.readValidInput(INPUT_MESSAGES.PURCHASE_AMOUNT);
  }

  static async readWinningNumbers() {
    const winningNumbers = await InputView.readValidInput(
      "\n" + INPUT_MESSAGES.WINNING_NUMBERS
    );
    return winningNumbers.split(",").map((num) => Number(num));
  }

  static async readBonusNumbers() {
    const bonusNumbers = await InputView.readValidInput(
      INPUT_MESSAGES.BONNUS_NUMBERS
    );
    return [Number(bonusNumbers)];
  }

  static async askRestart() {
    const answer = await InputView.read("\n다시 시작하시겠습니까? (y/n) ");
    const processed = answer.toLowerCase().trim();

    if (processed === "y" || processed === "n") {
      return processed;
    }
  }
}
