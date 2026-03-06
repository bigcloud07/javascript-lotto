import LottoMachine from "../src/LottoMachine.js";

test("로또 발행 test", () => {
  const purchaseAmount = 3000;
  const lottoMachine = new LottoMachine(purchaseAmount);
  const lottoNumbers = lottoMachine.issueLottos();

  expect(lottoNumbers.length).toBe(3);
});
