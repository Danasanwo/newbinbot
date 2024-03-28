/**
 * Default period for NVI.
 */
export declare const NVI_DEFAULT_PERIOD = 255;
/**
 * The Negative Volume Index (NVI) is a cumulative indicator using
 * the change in volume to decide when the smart money is active.
 *
 * If Volume is greather than Previous Volume:
 *
 *   NVI = Previous NVI
 *
 * Otherwise:
 *
 *   NVI = Previous NVI + (((Closing - Previous Closing) / Previous Closing) * Previous NVI)
 *
 * @param closings closing values.
 * @param volumes volume values.
 * @returns nvi values.
 */
export declare function negativeVolumeIndex(closings: number[], volumes: number[]): number[];
