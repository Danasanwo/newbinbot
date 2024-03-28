/**
 * Default period of CMF.
 */
export declare const CMF_DEFAULT_PERIOD = 20;
/**
 * The Chaikin Money Flow (CMF) measures the amount of money flow volume
 * over a given period.
 *
 * Money Flow Multiplier = ((Closing - Low) - (High - Closing)) / (High - Low)
 * Money Flow Volume = Money Flow Multiplier * Volume
 * Chaikin Money Flow = Sum(20, Money Flow Volume) / Sum(20, Volume)
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @param volumes volume values.
 * @returns cmf values.
 */
export declare function chaikinMoneyFlow(highs: number[], lows: number[], closings: number[], volumes: number[]): number[];
