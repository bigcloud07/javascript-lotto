import { InputValidator } from "../src/utils/validator.js";

describe("InputValidator test", () => {
  describe("구입 금액 검증 test", () => {
    it("입력값이 없거나 공백이면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validatePurchaseAmount("   ")).toThrow("[ERROR] 구입 금액을 입력해 주세요.");
      expect(() => InputValidator.validatePurchaseAmount("")).toThrow("[ERROR] 구입 금액을 입력해 주세요.");
    });

    it("숫자가 아닌 값이 입력되면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validatePurchaseAmount("천원")).toThrow("[ERROR] 구입 금액은 숫자여야 합니다.");
    });

    it("0 이하의 숫자가 입력되면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validatePurchaseAmount("0")).toThrow("[ERROR] 구입 금액은 0보다 큰 양수여야 합니다.");
      expect(() => InputValidator.validatePurchaseAmount("-1000")).toThrow("[ERROR] 구입 금액은 0보다 큰 양수여야 합니다.");
    });

    it("1,000원 단위가 아니면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validatePurchaseAmount("1500")).toThrow("[ERROR] 구입 금액은 1,000원 단위여야 합니다.");
    });
  });

  describe("당첨 번호 검증 test", () => {
    it("입력값이 없거나 공백이면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validateWinningNumbers(" ")).toThrow("[ERROR] 당첨 번호를 입력해 주세요.");
    });

    it("번호가 6개가 아니면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validateWinningNumbers("1, 2, 3, 4, 5")).toThrow("[ERROR] 당첨 번호는 6개여야 합니다.");
      expect(() => InputValidator.validateWinningNumbers("1, 2, 3, 4, 5, 6, 7")).toThrow("[ERROR] 당첨 번호는 6개여야 합니다.");
    });

    it("숫자가 아닌 값이 포함되어 있으면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validateWinningNumbers("1, 2, a, 4, 5, 6")).toThrow("[ERROR] 당첨 번호는 모두 숫자여야 합니다.");
    });

    it("1~45 범위를 벗어난 숫자가 있으면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validateWinningNumbers("0, 2, 3, 4, 5, 6")).toThrow("[ERROR] 당첨 번호는 1부터 45 사이의 숫자여야 합니다.");
      expect(() => InputValidator.validateWinningNumbers("1, 2, 3, 4, 5, 46")).toThrow("[ERROR] 당첨 번호는 1부터 45 사이의 숫자여야 합니다.");
    });

    it("중복된 숫자가 있으면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validateWinningNumbers("1, 2, 3, 4, 5, 5")).toThrow("[ERROR] 당첨 번호는 중복될 수 없습니다.");
    });
  });

  describe("보너스 번호 검증 test", () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];

    it("입력값이 없거나 공백이면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validateBonusNumber("", winningNumbers)).toThrow("[ERROR] 보너스 번호를 입력해 주세요.");
    });

    it("숫자가 아닌 값이 입력되면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validateBonusNumber("a", winningNumbers)).toThrow("[ERROR] 보너스 번호는 숫자여야 합니다.");
    });

    it("1~45 범위를 벗어나면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validateBonusNumber("0", winningNumbers)).toThrow("[ERROR] 보너스 번호는 1부터 45 사이의 숫자여야 합니다.");
      expect(() => InputValidator.validateBonusNumber("46", winningNumbers)).toThrow("[ERROR] 보너스 번호는 1부터 45 사이의 숫자여야 합니다.");
    });

    it("당첨 번호와 중복되면 에러를 발생시킨다.", () => {
      expect(() => InputValidator.validateBonusNumber("6", winningNumbers)).toThrow("[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.");
    });
  });
});