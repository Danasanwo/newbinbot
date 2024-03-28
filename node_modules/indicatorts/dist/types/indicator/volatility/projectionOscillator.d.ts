/**
 * Projection oscillator result object.
 */
export interface ProjectionOscillator {
    po: number[];
    spo: number[];
}
/**
 * ProjectionOscillator calculates the Projection Oscillator (PO). The PO
 * uses the linear regression slope, along with highs and lows.
 *
 * Period defines the moving window to calculates the PO, and the smooth
 * period defines the moving windows to take EMA of PO.
 *
 * PL = Min(period, (high + MLS(period, x, high)))
 * PU = Max(period, (low + MLS(period, x, low)))
 * PO = 100 * (Closing - PL) / (PU - PL)
 * SPO = EMA(smooth, PO)
 *
 * @param period window period.
 * @param smooth smooth period.
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return projection oscillator.
 */
export declare function projectionOscillator(period: number, smooth: number, highs: number[], lows: number[], closings: number[]): ProjectionOscillator;
/**
 * Default projection oscillator function.
 * @param highs high values.
 * @param lows lows values.
 * @param closings closing values.
 * @return projection oscillator.
 */
export declare function defaultProjectionOscillator(highs: number[], lows: number[], closings: number[]): ProjectionOscillator;
