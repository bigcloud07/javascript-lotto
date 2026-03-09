export const LottoValidator = {
  validatePurchaseAmount(input) {
    if (!input || input.trim() === "") {
      throw new Error("[ERROR] 구입 금액을 입력해 주세요.");
    }

    const amount = Number(input);

    if (Number.isNaN(amount)) {
      throw new Error("[ERROR] 구입 금액은 숫자여야 합니다.");
    }
    if (amount <= 0) {
      throw new Error("[ERROR] 구입 금액은 0보다 큰 양수여야 합니다.");
    }
    if (amount % 1000 !== 0) {
      throw new Error("[ERROR] 구입 금액은 1,000원 단위여야 합니다.");
    }
  },
  
  validateWinningNumbers(input) {
    if (!input || input.trim() === "") {
      throw new Error("[ERROR] 당첨 번호를 입력해 주세요.");
    }

    const numbers = input.split(",").map(num => Number(num.trim()));

    if (numbers.length !== 6) {
      throw new Error("[ERROR] 당첨 번호는 6개여야 합니다.");
    }
    if (numbers.some(num => Number.isNaN(num))) {
      throw new Error("[ERROR] 당첨 번호는 모두 숫자여야 합니다.");
    }
    if (numbers.some(num => num < 1 || num > 45)) {
      throw new Error("[ERROR] 당첨 번호는 1부터 45 사이의 숫자여야 합니다.");
    }
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== 6) {
      throw new Error("[ERROR] 당첨 번호는 중복될 수 없습니다.");
    }
  },

  validateBonusNumber(input, winningNumbers) {
    if (!input || input.trim() === "") {
      throw new Error("[ERROR] 보너스 번호를 입력해 주세요.");
    }

    const bonusNumber = Number(input.trim());

    if (Number.isNaN(bonusNumber)) {
      throw new Error("[ERROR] 보너스 번호는 숫자여야 합니다.");
    }
    if (bonusNumber < 1 || bonusNumber > 45) {
      throw new Error("[ERROR] 보너스 번호는 1부터 45 사이의 숫자여야 합니다.");
    }
    if (winningNumbers.includes(bonusNumber)) {
      throw new Error("[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.");
    }
  }
};