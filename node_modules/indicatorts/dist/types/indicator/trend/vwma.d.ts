/** Default VWMA period value. */
export declare const DEFAULT_VWMA_PERIOD = 20;
/**
 * The vwma function calculates the Volume Weighted Moving Average (VWMA)
 * averaging the price data with an emphasis on volume, meaning areas
 * with higher volume will have a greater weight.
 *
 * VWMA = Sum(Price * Volume) / Sum(Volume) for a given Period.
 *
 * @param period period value.
 * @param closings asset closings.
 * @param volumes asset volumes.
 * @returns vwma values.
 */
export declare function vwma(period: number, closings: number[], volumes: number[]): number[];
/**
 * The defaultVwma function calculates VWMA with a period of 20.
 *
 * @param closings asset closings.
 * @param volumes asset volumes.
 * @returns vwma values.
 */
export declare function defaultVwma(closings: number[], volumes: number[]): number[];
