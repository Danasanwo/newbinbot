/**
 * The Force Index (FI) uses the closing price and the volume to assess
 * the power behind a move and identify turning points.
 *
 * Force Index = EMA(period, (Current - Previous) * Volume)
 *
 * @param period window period.
 * @param closings closing values.
 * @param volumes volume values.
 * @return force index.
 */
export declare function forceIndex(period: number, closings: number[], volumes: number[]): number[];
/**
 * The default Force Index (FI) with window size of 13.
 *
 * @param closings closing values.
 * @param volumes volume values.
 * @return force index.
 */
export declare function defaultForceIndex(closings: number[], volumes: number[]): number[];
