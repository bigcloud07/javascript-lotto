export default class Lotto {
  #numbers;

  constructor(lottoNumbers) {
    this.#numbers = lottoNumbers;
  }

  getNumbers() {
    return [...this.#numbers];
  }

  calculateMatchCount(targetNumbers) {
    return this.#numbers.filter((number) => targetNumbers.includes(number))
      .length;
  }

  hasBonusNumber(bonusNumbers) {
    return bonusNumbers.some((bonusNumber) =>
      this.#numbers.includes(bonusNumber)
    );
  }
}
