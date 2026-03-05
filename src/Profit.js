export default class Profit {
  static sumPrize(stats) {
    let totalPrize = 0;

    Object.values(stats).forEach(({ count, prize }) => {
      totalPrize += count * prize;
    });

    return totalPrize;
  }

  static calculateProfit(purchasedAmount, stats) {
    const totalPrize = this.sumPrize(stats);
    return ((totalPrize / purchasedAmount) * 100).toFixed(1);
  }

  static printProfitRate(purchasedAmount, stats) {
    const profitRate = this.calculateProfit(purchasedAmount, stats);
    console.log(`총 수익률은 ${profitRate}%입니다.`);
  }
}
