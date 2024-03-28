/**
 * Default period for UI.
 */
export declare const UI_DEFAULT_PERIOD = 14;
/**
 * The Ulcer Index (UI) measures downside risk. The index increases in value
 * as the price moves farther away from a recent high and falls as the price
 * rises to new highs.
 *
 * High Closings = Max(period, Closings)
 * Percentage Drawdown = 100 * ((Closings - High Closings) / High Closings)
 * Squared Average = Sma(period, Percent Drawdown * Percent Drawdown)
 * Ulcer Index = Sqrt(Squared Average)
 *
 * @param period window period.
 * @param closings closing values.
 * @returns ui values.
 */
export declare function ulcerIndex(period: number, closings: number[]): number[];
/**
 * The default ulcer index with the default period of 14.
 *
 * @param closings closing values.
 * @returns ui values.
 */
export declare function defaultUlcerIndex(closings: number[]): number[];
