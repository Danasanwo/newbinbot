/**
 * Default period of CMI.
 */
export declare const CMI_PERIOD = 20;
/**
 * The Community Channel Index (CMI) is a momentum-based oscillator
 * used to help determine when an investment vehicle is reaching a
 * condition of being overbought or oversold.
 *
 * Moving Average = Sma(Period, Typical Price)
 * Mean Deviation = Sma(Period, Abs(Typical Price - Moving Average))
 * CMI = (Typical Price - Moving Average) / (0.015 * Mean Deviation)
 *
 * @param period window period.
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @returns cmi values.
 */
export declare function communityChannelIndex(period: number, highs: number[], lows: number[], closings: number[]): number[];
/**
 * The default community channel index with the period of 20.
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @returns cmi values.
 */
export declare function defaultCommunityChannelIndex(highs: number[], lows: number[], closings: number[]): number[];
