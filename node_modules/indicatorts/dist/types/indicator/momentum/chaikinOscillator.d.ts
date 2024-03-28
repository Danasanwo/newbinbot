/**
 * Chaikin oscillator result object.
 */
export interface ChaikinOscillator {
    ad: number[];
    co: number[];
}
/**
 * The ChaikinOscillator function measures the momentum of the
 * Accumulation/Distribution (A/D) using the Moving Average
 * Convergence Divergence (MACD) formula. It takes the
 * difference between fast and slow periods EMA of the A/D.
 * Cross above the A/D line indicates bullish.
 *
 * CO = Ema(fastPeriod, AD) - Ema(slowPeriod, AD)
 *
 * @param fastPeriod fast period.
 * @param slowPeriod slow period.
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param volumes volume values.
 * @return chaikin oscillator.
 */
export declare function chaikinOscillator(fastPeriod: number, slowPeriod: number, highs: number[], lows: number[], closings: number[], volumes: number[]): ChaikinOscillator;
/**
 * The defaultChaikinOscillator function calculates Chaikin Oscillator
 * with the most frequently used fast and short periods, 3 and 10.
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param volumes volume values.
 * @return chaikin oscillator.
 */
export declare function defaultChaikinOscillator(highs: number[], lows: number[], closings: number[], volumes: number[]): ChaikinOscillator;
