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
  PURCHASE_SUFFIX: "개를 구매했습니다."
});

export const LOTTO_RANK_RULES = Object.freeze({
  "3_MATCH": 3,
  "4_MATCH": 4,
  "5_MATCH": 5,
  "5_BONUS_MATCH": "5개 번호 + 보너스 번호 일치",
  "6_MATCH": 6,
});

export const LOTTO_PRICE = 1000;

export const ERROR_MESSAGES = Object.freeze({
  PURCHASE_AMOUNT: Object.freeze({
    EMPTY: "[ERROR] 구입 금액을 입력해 주세요.",
    NOT_NUMBER: "[ERROR] 구입 금액은 숫자여야 합니다.",
    NOT_POSITIVE: "[ERROR] 구입 금액은 0보다 큰 양수여야 합니다.",
    NOT_THOUSAND_UNIT: "[ERROR] 구입 금액은 1,000원 단위여야 합니다.",
  }),
  WINNING_NUMBERS: Object.freeze({
    EMPTY: "[ERROR] 당첨 번호를 입력해 주세요.",
    NOT_SIX: "[ERROR] 당첨 번호는 6개여야 합니다.",
    NOT_NUMBER: "[ERROR] 당첨 번호는 모두 숫자여야 합니다.",
    OUT_OF_RANGE: "[ERROR] 당첨 번호는 1부터 45 사이의 숫자여야 합니다.",
    DUPLICATED: "[ERROR] 당첨 번호는 중복될 수 없습니다.",
  }),
  BONUS_NUMBER: Object.freeze({
    EMPTY: "[ERROR] 보너스 번호를 입력해 주세요.",
    NOT_NUMBER: "[ERROR] 보너스 번호는 숫자여야 합니다.",
    OUT_OF_RANGE: "[ERROR] 보너스 번호는 1부터 45 사이의 숫자여야 합니다.",
    DUPLICATED: "[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.",
  }),
});