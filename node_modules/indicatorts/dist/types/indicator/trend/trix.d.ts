/**
 * Triple Exponential Average (TRIX) indicator is an oscillator used to
 * identify oversold and overbought markets, and it can also be used
 * as a momentum indicator. Like many oscillators, TRIX oscillates
 * around a zero line.
 *
 * EMA1 = EMA(period, values)
 * EMA2 = EMA(period, EMA1)
 * EMA3 = EMA(period, EMA2)
 * TRIX = (EMA3 - Previous EMA3) / Previous EMA3
 *
 * @param period window period.
 * @param values values array.
 * @returns trix values.
 */
export declare function trix(period: number, values: number[]): number[];
