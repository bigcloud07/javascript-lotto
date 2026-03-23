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

  static async readValidInput(query, validator) {
    try {
      const input = await InputView.read(query);

      if (validator) {
        validator(input);
      }

      return input;
    } catch (err) {
      console.error(err.message);
      return await InputView.readValidInput(query, validator);
    }
  }

  static close() {
    rl.close();
  }

  static async readPurchaseAmount(validator) {
    return await InputView.readValidInput(
      INPUT_MESSAGES.PURCHASE_AMOUNT,
      validator,
    );
  }

  static async readWinningNumbers(validator) {
    const winningNumbers = await InputView.readValidInput(
      "\n" + INPUT_MESSAGES.WINNING_NUMBERS,
      validator,
    );
    return winningNumbers.split(",").map((num) => Number(num));
  }

  static async readBonusNumbers(validator) {
    const bonusNumbers = await InputView.readValidInput(
      INPUT_MESSAGES.BONNUS_NUMBERS,
      validator,
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
