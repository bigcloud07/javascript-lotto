export default class Profit {
  static sumPrize(stats) {
    const totalPrize = Object.values(stats).reduce(
      (sum, { count, prize }) => sum + count * prize,
      0
    );

    return totalPrize;
  }

  static calculateProfit(purchasedAmount, stats) {
    const totalPrize = this.sumPrize(stats);
    return Number(((totalPrize / purchasedAmount) * 100).toFixed(1));
  }
}
