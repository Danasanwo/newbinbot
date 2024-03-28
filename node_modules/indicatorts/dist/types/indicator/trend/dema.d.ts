/**
 * Dema calculates the Double Exponential Moving Average (DEMA).
 *
 * DEMA = (2 * EMA(values)) - EMA(EMA(values))
 *
 * @param period window period.
 * @param values values array.
 * @return dema values.
 */
export declare function dema(period: number, values: number[]): number[];
