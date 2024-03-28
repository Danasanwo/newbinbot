/**
 * Williams R. Determine overbought and oversold.
 *
 * WR = (Highest High - Closing) / (Highest High - Lowest Low) * -100.
 *
 * Buy when -80 and below. Sell when -20 and above.
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return wr values.
 */
export declare function williamsR(highs: number[], lows: number[], closings: number[]): number[];
