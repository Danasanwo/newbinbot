import { Asset } from '../asset';
import { Action } from '../action';
/**
 * The vwmaStrategy function uses SMA and VWMA indicators to provide
 * a BUY action when VWMA is above SMA, and a SELL signal when VWMA
 * is below SMA, a HOLD signal otherwse.
 *
 * @param period period value.
 * @param asset asset object.
 * @returns strategy actions.
 */
export declare function wvmaStrategy(period: number, asset: Asset): Action[];
/**
 * The defaultVwmaStrategy function calculates VWMA with a period of 20.
 *
 * @param asset asset object.
 * @returns strategy actions.
 */
export declare function defaultVwmaStrategy(asset: Asset): Action[];
