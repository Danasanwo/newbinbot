/**
 * Stochastic oscillator result object.
 */
export interface StochasticOscillator {
    k: number[];
    d: number[];
}
/**
 * Stochastic Oscillator. It is a momentum indicator that shows the
 * location of the closing relative to high-low range over a
 * set number of periods.
 *
 * K = (Closing - Lowest Low) / (Highest High - Lowest Low) * 100
 * D = 3-Period SMA of K
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return stochastic oscillator result object.
 */
export declare function stochasticOscillator(highs: number[], lows: number[], closings: number[]): StochasticOscillator;
