/**
 * Tema calculates the Triple Exponential Moving Average (TEMA).
 *
 * TEMA = (3 * EMA1) - (3 * EMA2) + EMA3
 * EMA1 = EMA(values)
 * EMA2 = EMA(EMA1)
 * EMA3 = EMA(EMA2)
 *
 * @param period window period.
 * @param values values array.
 * @return tema values.
 */
export declare function tema(period: number, values: number[]): number[];
