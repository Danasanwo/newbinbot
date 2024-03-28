export interface MacdResult {
    macdLine: number[];
    signalLine: number[];
}
/**
 * Moving Average Convergence Divergence (MACD).
 *
 * MACD = 12-Period EMA - 26-Period EMA.
 * Signal = 9-Period EMA of MACD.
 *
 * @param closings closing values.
 * @return macd result.
 */
export declare function macd(closings: number[]): MacdResult;
