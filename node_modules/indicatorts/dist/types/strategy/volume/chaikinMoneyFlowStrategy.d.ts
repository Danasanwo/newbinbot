import { Action } from '../action';
import { Asset } from '../asset';
/**
 * The chaikin money flow strategy uses the cmf values that are generated
 * by the Chaikin Money Flow (CMF) indicator function to provide a BUY
 * action when cmf is less than zero, a SELL action when cmf is
 * greather than zero, a HOLD action otherwise.
 *
 * @param asset asset object.
 * @returns strategy actions.
 */
export declare function chaikinMoneyFlowStrategy(asset: Asset): Action[];
