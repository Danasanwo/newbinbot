/**
 * Custom RSI. It is a momentum indicator that measures the magnitude of
 * recent price changes to evaluate overbought and oversold conditions
 * using the given window period.
 *
 * RS = Average Gain / Average Loss
 * RSI = 100 - (100 / (1 + RS))
 *
 * @param period window period.
 * @param closings closing values.
 * @return rsi values.
 */
export declare function customRsi(period: number, closings: number[]): number[];
/**
 * Relative Strength Index (RSI). It is a momentum indicator that measures
 * the magnitude of recent price changes to evaluate overbought and
 * oversold conditions using the window period of 14.
 *
 * RS = Average Gain / Average Loss
 * RSI = 100 - (100 / (1 + RS))
 *
 * @param closings closing values.
 * @return rsi values.
 */
export declare function rsi(closings: number[]): number[];
