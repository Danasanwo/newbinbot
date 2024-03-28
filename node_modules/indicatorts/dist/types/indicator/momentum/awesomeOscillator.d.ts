/**
 * Awesome Oscillator.
 *
 * Median Price = ((Low + High) / 2).
 * AO = 5-Period SMA - 34-Period SMA.
 *
 * @param highs high values.
 * @param lows low values.
 * @return awesome oscillator.
 */
export declare function awesomeOscillator(highs: number[], lows: number[]): number[];
