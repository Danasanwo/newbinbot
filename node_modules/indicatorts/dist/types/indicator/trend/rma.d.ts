/**
 * Rolling moving average (RMA).
 *
 * R[0] to R[p-1] is SMA(values)
 * R[p] and after is R[i] = ((R[i-1]*(p-1)) + v[i]) / p
 *
 * @param period window period.
 * @param values values array.
 * @returns RMA values.
 */
export declare function rma(period: number, values: number[]): number[];
