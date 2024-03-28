/**
 * Bollinger bands result object.
 */
export interface BollingerBands {
    upperBand: number[];
    middleBand: number[];
    lowerBand: number[];
}
/**
 * Bollinger Bands.
 *
 * Middle Band = 20-Period SMA.
 * Upper Band = 20-Period SMA + 2 (20-Period Std)
 * Lower Band = 20-Period SMA - 2 (20-Period Std)
 *
 * @param closings closing values.
 * @return bollinger bands.
 */
export declare function bollingerBands(closings: number[]): BollingerBands;
