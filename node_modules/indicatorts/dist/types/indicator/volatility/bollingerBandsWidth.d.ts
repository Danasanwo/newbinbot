import { BollingerBands } from './bollingerBands';
/**
 * Bollinger bands width result.
 */
export interface BollingerBandsWidth {
    bandWidth: number[];
    bandWidthEma90: number[];
}
/**
 * Bollinger Band Width. It measures the percentage difference between the
 * upper band and the lower band. It decreases as Bollinger Bands narrows
 * and increases as Bollinger Bands widens
 *
 * During a period of rising price volatity the band width widens, and
 * during a period of low market volatity band width contracts.
 *
 * Band Width = (Upper Band - Lower Band) / Middle Band
 *
 * @param bb bollinger bands.
 * @return bollinger bands width result.
 */
export declare function bollingerBandsWidth(bb: BollingerBands): BollingerBandsWidth;
