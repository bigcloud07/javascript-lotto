import { ERROR_MESSAGES } from "../src/constants.js";
import { InputValidator } from "../src/utils/validator.js";

describe("InputValidator test", () => {
  describe("구입 금액 검증 test", () => {
    it("입력값이 없거나 공백이면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validatePurchaseAmount("   ")).toThrow(ERROR_MESSAGES.PURCHASE_AMOUNT.EMPTY);
      expect(() => InputValidator.validatePurchaseAmount("")).toThrow(ERROR_MESSAGES.PURCHASE_AMOUNT.EMPTY);
    });

    it("숫자가 아닌 값이 입력되면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validatePurchaseAmount("천원")).toThrow(ERROR_MESSAGES.PURCHASE_AMOUNT.NOT_NUMBER);
    });

    it("0 이하의 숫자가 입력되면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validatePurchaseAmount("0")).toThrow(ERROR_MESSAGES.PURCHASE_AMOUNT.NOT_POSITIVE);
      expect(() => InputValidator.validatePurchaseAmount("-1000")).toThrow(ERROR_MESSAGES.PURCHASE_AMOUNT.NOT_POSITIVE);
    });

    it("1,000원 단위가 아니면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validatePurchaseAmount("1500")).toThrow(ERROR_MESSAGES.PURCHASE_AMOUNT.NOT_THOUSAND_UNIT);
    });
  });

  describe("당첨 번호 검증 test", () => {
    it("입력값이 없거나 공백이면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validateWinningNumbers(" ")).toThrow(ERROR_MESSAGES.WINNING_NUMBERS.EMPTY);
    });

    it("번호가 6개가 아니면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validateWinningNumbers("1, 2, 3, 4, 5")).toThrow(ERROR_MESSAGES.WINNING_NUMBERS.NOT_SIX);
      expect(() => InputValidator.validateWinningNumbers("1, 2, 3, 4, 5, 6, 7")).toThrow(ERROR_MESSAGES.WINNING_NUMBERS.NOT_SIX);
    });

    it("숫자가 아닌 값이 포함되어 있으면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validateWinningNumbers("1, 2, a, 4, 5, 6")).toThrow(ERROR_MESSAGES.WINNING_NUMBERS.NOT_NUMBER);
    });

    it("1~45 범위를 벗어난 숫자가 있으면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validateWinningNumbers("0, 2, 3, 4, 5, 6")).toThrow(ERROR_MESSAGES.WINNING_NUMBERS.OUT_OF_RANGE);
      expect(() => InputValidator.validateWinningNumbers("1, 2, 3, 4, 5, 46")).toThrow(ERROR_MESSAGES.WINNING_NUMBERS.OUT_OF_RANGE);
    });

    it("중복된 숫자가 있으면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validateWinningNumbers("1, 2, 3, 4, 5, 5")).toThrow(ERROR_MESSAGES.WINNING_NUMBERS.DUPLICATED);
    });
  });

  describe("보너스 번호 검증 test", () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];

    it("입력값이 없거나 공백이면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validateBonusNumber("", winningNumbers)).toThrow(ERROR_MESSAGES.BONUS_NUMBER.EMPTY);
    });

    it("숫자가 아닌 값이 입력되면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validateBonusNumber("a", winningNumbers)).toThrow(ERROR_MESSAGES.BONUS_NUMBER.NOT_NUMBER);
    });

    it("1~45 범위를 벗어나면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validateBonusNumber("0", winningNumbers)).toThrow(ERROR_MESSAGES.BONUS_NUMBER.OUT_OF_RANGE);
      expect(() => InputValidator.validateBonusNumber("46", winningNumbers)).toThrow(ERROR_MESSAGES.BONUS_NUMBER.OUT_OF_RANGE);
    });

    it("당첨 번호와 중복되면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validateBonusNumber("6", winningNumbers)).toThrow(ERROR_MESSAGES.BONUS_NUMBER.DUPLICATED);
    });
  });
});