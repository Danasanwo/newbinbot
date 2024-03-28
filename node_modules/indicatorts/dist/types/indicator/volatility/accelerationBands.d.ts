/**
 * Acceleration bands result object.
 */
export interface AccelerationBands {
    upperBand: number[];
    middleBand: number[];
    lowerBand: number[];
}
/**
 * Acceleration Bands. Plots upper and lower envelope bands
 * around a simple moving average.
 *
 * Upper Band = SMA(High * (1 + 4 * (High - Low) / (High + Low)))
 * Middle Band = SMA(Closing)
 * Lower Band = SMA(Low * (1 - 4 * (High - Low) / (High + Low)))
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return acceleration band.
 */
export declare function accelerationBands(highs: number[], lows: number[], closings: number[]): AccelerationBands;
