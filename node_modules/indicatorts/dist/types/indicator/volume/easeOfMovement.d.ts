/**
 * Default period for EMV.
 */
export declare const EMV_DEFAULT_PERIOD = 14;
/**
 * The Ease of Movement (EMV) is a volume based oscillator measuring
 * the ease of price movement.
 *
 * Distance Moved = ((High + Low) / 2) - ((Priod High + Prior Low) /2)
 * Box Ratio = ((Volume / 100000000) / (High - Low))
 * EMV(1) = Distance Moved / Box Ratio
 * EMV(14) = SMA(14, EMV(1))
 *
 * @param period window period.
 * @param highs high values.
 * @param lows low values.
 * @param volumes volume values.
 * @return ease of movement values.
 */
export declare function easeOfMovement(period: number, highs: number[], lows: number[], volumes: number[]): number[];
/**
 * The default Ease of Movement with the default period of 14.
 *
 * @param highs high values.
 * @param lows low values.
 * @param volumes volume values.
 * @return ease of movement values.
 */
export declare function defaultEaseOfMovement(highs: number[], lows: number[], volumes: number[]): number[];
