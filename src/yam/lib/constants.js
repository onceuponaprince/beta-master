import BigNumber from 'bignumber.js/bignumber';

export const SUBTRACT_GAS_LIMIT = 100000;

const ONE_MINUTE_IN_SECONDS = new BigNumber(60);
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60);
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24);
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365);

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
};

export const addressMap = {
  uniswapFactory : "0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95",
  uniswapFactoryV2: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
  WETH : "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  UNIRouter : "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  YAMYCRV: "0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726",
  USDC: "0xb1FFd2B420a76c5DE0E2Da00F7263633f25D3416", // fake usdc
  AUSC_LP: "0xee45ff229cb500bf35f72d2e4f795e9efef5855c"
}

export const events = {
  transaction: {
    Started: "transaction-started",
    Failed: "transaction-failed",
    Success: "transaction-success",
  }
}
