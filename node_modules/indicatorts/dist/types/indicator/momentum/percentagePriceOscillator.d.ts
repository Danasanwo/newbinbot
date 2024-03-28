/**
 * Percentage price oscillator result.
 */
export interface PercentagePriceOscillator {
    ppo: number[];
    signal: number[];
    histogram: number[];
}
/**
 * Percentage Price Oscillator (PPO). It is a momentum oscillator for the price.
 * It is used to indicate the ups and downs based on the price. A breakout is
 * confirmed when PPO is positive.
 *
 * PVO = ((EMA(fastPeriod, prices) - EMA(slowPeriod, prices)) / EMA(longPeriod, prices)) * 100
 * Signal = EMA(9, PVO)
 * Histogram = PVO - Signal
 *
 * @param fastPeriod fast period.
 * @param slowPeriod slow period.
 * @param signalPeriod signal period.
 * @param prices price values.
 * @returns oscillator result.
 */
export declare function percentagePriceOscillator(fastPeriod: number, slowPeriod: number, signalPeriod: number, prices: number[]): PercentagePriceOscillator;
/**
 * Default Percentage Price Oscillator calculates it with the default periods of 12, 26, 9.
 *
 * @param prices price values.
 * @returns oscillator result.
 */
export declare function defaultPercentagePriceOscillator(prices: number[]): PercentagePriceOscillator;
