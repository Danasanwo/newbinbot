/**
 * KDJ result.
 */
export interface KdjResult {
    k: number[];
    d: number[];
    j: number[];
}
/**
 * The kdj function calculates the KDJ  indicator, also known as
 * the Random Index. KDJ is calculated similar to the Stochastic
 * Oscillator with the difference of having the J line. It is
 * used to analyze the trend and entry points.
 *
 * The K and D lines show if the asset is overbought when they
 * crosses above 80%, and oversold when they crosses below
 * 20%. The J line represents the divergence.
 *
 * RSV = ((Closing - Min(Low, rPeriod))
 *       / (Max(High, rPeriod) - Min(Low, rPeriod))) * 100
 * K = Sma(RSV, kPeriod)
 * D = Sma(K, dPeriod)
 * J = (3 * K) - (2 * D)
 *
 * @param rPeriod r period.
 * @param kPeriod k period.
 * @param dPeriod d period.
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return kdj result.
 */
export declare function kdj(rPeriod: number, kPeriod: number, dPeriod: number, highs: number[], lows: number[], closings: number[]): KdjResult;
/**
 * The defaultKdj function calculates KDJ based on default periods
 * consisting of rPeriod of 9, kPeriod of 3, and dPeriod of 3.
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return kdj result.
 */
export declare function defaultKdj(highs: number[], lows: number[], closings: number[]): KdjResult;
