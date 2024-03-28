import { Asset } from '../asset';
import { Action } from '../action';
/**
 * Typical price strategy function.
 *
 * @param asset asset object.
 * @return strategy actions.
 */
export declare function typicalPriceStrategy(asset: Asset): Action[];
