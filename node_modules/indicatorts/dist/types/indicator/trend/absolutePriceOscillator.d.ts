/**
 * Absolute Price Oscillator (APO) function calculates the technical indicator
 * that is used to follow trends. APO crossing above zero indicates bullish,
 * while crossing below zero indicates bearish. Positive value is upward
 * trend, while negative value is downward trend.
 *
 * Fast = EMA(fastPeriod, values)
 * Slow = EMA(slowPeriod, values)
 * APO = Fast - Slow
 *
 * @param fastPeriod fast period.
 * @param slowPeriod slow period.
 * @param values values array.
 * @return apo array.
 */
export declare function absolutePriceOscillator(fastPeriod: number, slowPeriod: number, values: number[]): number[];
/**
 * Default APO function calculates APO with frequently used fast period 14,
 * and slow period 30.
 * @param values values array.
 * @return apo array.
 */
export declare function defaultAbsolutePriceOscillator(values: number[]): number[];
