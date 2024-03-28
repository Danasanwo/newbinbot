/**
 * The Money Flow Index (MFI) analyzes both the closing price and the volume
 * to measure to identify overbought and oversold states. It is similar to
 * the Relative Strength Index (RSI), but it also uses the volume.
 *
 * Raw Money Flow = Typical Price * Volume
 * Money Ratio = Positive Money Flow / Negative Money Flow
 * Money Flow Index = 100 - (100 / (1 + Money Ratio))
 *
 * @param period window period.
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param volumes volume values.
 * @return money flow index values.
 */
export declare function moneyFlowIndex(period: number, highs: number[], lows: number[], closings: number[], volumes: number[]): number[];
/**
 * Default money flow index with period 14.
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param volumes volume values.
 * @return money flow index values.
 */
export declare function defaultMoneyFlowIndex(highs: number[], lows: number[], closings: number[], volumes: number[]): number[];
