/**
 * Trima function calculates the Triangular Moving Average (TRIMA).
 *
 * If period is even:
 *   TRIMA = SMA(period / 2, SMA((period / 2) + 1, values))
 * If period is odd:
 *   TRIMA = SMA((period + 1) / 2, SMA((period + 1) / 2, values))
 *
 * @param period window period.
 * @param values values array.
 * @return trima values.
 */
export declare function trima(period: number, values: number[]): number[];
