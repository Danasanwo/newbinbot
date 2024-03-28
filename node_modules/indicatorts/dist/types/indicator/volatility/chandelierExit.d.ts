/**
 * Chandelier exit result object.
 */
export interface ChandelierExitResult {
    exitLong: number[];
    exitShort: number[];
}
/**
 * Chandelier Exit. It sets a trailing stop-loss based on the
 * Average True Value (ATR).
 *
 * Long Exit = 22-Period SMA High - ATR(22) * 3
 * Chandelier Exit Short = 22-Period SMA Low + ATR(22) * 3
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return chandelier exit.
 */
export declare function chandelierExit(highs: number[], lows: number[], closings: number[]): ChandelierExitResult;
