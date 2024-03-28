import { Asset } from '../asset';
import { Action } from '../action';
/**
 * Absolute Price Oscillator (APO) strategy function.
 *
 * @param fastPeriod fast period.
 * @param slowPeriod slow period.
 * @param asset asset object.
 * @return strategy actions.
 */
export declare function absolutePriceOscillatorStrategy(fastPeriod: number, slowPeriod: number, asset: Asset): Action[];
/**
 * Default Absolute Price Oscillator (APO) strategy.
 *
 * @param asset asset object.
 * @return strategy actions.
 */
export declare function defaultAbsolutePriceOscillatorStrategy(asset: Asset): Action[];
