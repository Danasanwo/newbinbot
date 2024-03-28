/**
 * Default period for VWAP.
 */
export declare const VWAP_DEFAULT_PERIOD = 14;
/**
 * The Volume Weighted Average Price (VWAP) provides the average price
 * the asset has traded.
 *
 * VWAP = Sum(Closing * Volume) / Sum(Volume)
 *
 * @param period window period.
 * @param closings closing values.
 * @param volumes volume values.
 * @returns vwap values.
 */
export declare function volumeWeightedAveragePrice(period: number, closings: number[], volumes: number[]): number[];
/**
 * Default volume weighted average price with period of 14.
 *
 * @param closings closing values.
 * @param volumes volume values.
 * @returns vwap values.
 */
export declare function defaultVolumeWeightedAveragePrice(closings: number[], volumes: number[]): number[];
