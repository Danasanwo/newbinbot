/**
 * The Mass Index (MI) uses the high-low range to identify trend reversals
 * based on range expansions.
 *
 * Singe EMA = EMA(9, Highs - Lows)
 * Double EMA = EMA(9, Single EMA)
 * Ratio = Single EMA / Double EMA
 * MI = Sum(25, Ratio)
 *
 * @param highs high values.
 * @param lows low values.
 * @returns mi values.
 */
export declare function massIndex(highs: number[], lows: number[]): number[];
