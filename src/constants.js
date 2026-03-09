export const INPUT_MESSAGES = Object.freeze({
  PURCHASE_AMOUNT: "구입금액을 입력해 주세요.\n",
  WINNING_NUMBERS: "당첨 번호를 입력해 주세요.\n",
  BONNUS_NUMBERS: "보너스 번호를 입력해 주세요.\n",
});

export const OUTPUT_MESSAGES = Object.freeze({
  STATS_HEADER: "당첨 통계\n--------------------\n",
  "5_BONUS_MATCH": "5개 일치, 보너스 볼 일치",
  PROFIT_RATE_PREFIX: "총 수익률은 ",
  PROFIT_RATE_SUFFIX: "%입니다.",
});

export const LOTTO_RULE = Object.freeze({
  LOTTO_PRICE: 1000,

  "3_MATCH": 3,
  "4_MATCH": 4,
  "5_MATCH": 5,
  "5_BONUS_MATCH": "5개 번호 + 보너스 번호 일치",
  "6_MATCH": 6,
});
