/**
 * Percentage volume oscillator result.
 */
export interface PercentageVolumeOscillator {
    pvo: number[];
    signal: number[];
    histogram: number[];
}
/**
 * Percentage Volume Oscillator (PVO). It is a momentum oscillator for the volume.
 * It is used to indicate the ups and downs based on the volume. A breakout is
 * confirmed when PVO is positive.
 *
 * PVO = ((EMA(fastPeriod, volumes) - EMA(slowPeriod, volumes)) / EMA(longPeriod, volumes)) * 100
 * Signal = EMA(9, PVO)
 * Histogram = PVO - Signal
 *
 * @param fastPeriod fast period.
 * @param slowPeriod slow period.
 * @param signalPeriod signal period.
 * @param volumes volume values.
 * @returns oscillator result.
 */
export declare function percentageVolumeOscillator(fastPeriod: number, slowPeriod: number, signalPeriod: number, volumes: number[]): PercentageVolumeOscillator;
/**
 * Default Percentage Volume Oscillator calculates it with the default periods of 12, 26, 9.
 *
 * @param volumes volume values.
 * @returns oscillator result.
 */
export declare function defaultPercentageVolumeOscillator(volumes: number[]): PercentageVolumeOscillator;
