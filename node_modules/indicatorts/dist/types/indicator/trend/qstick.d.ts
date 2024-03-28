/**
 * The Qstick function calculates the ratio of recent up and down bars.
 *
 * QS = Sma(Closing - Opening)
 *
 * @param period window period.
 * @param openings openinig values.
 * @param closings closing values.
 * @return qstick values.
 */
export declare function qstick(period: number, openings: number[], closings: number[]): number[];
