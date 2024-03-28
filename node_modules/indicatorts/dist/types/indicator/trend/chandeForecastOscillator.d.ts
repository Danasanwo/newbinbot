/**
 * The Chande Forecast Oscillator developed by Tushar Chande The Forecast
 * Oscillator plots the percentage difference between the closing price and
 * the n-period linear regression forecasted price. The oscillator is above
 * zero when the forecast price is greater than the closing price and less
 * than zero if it is below.
 *
 * R = Linreg(Closing)
 * CFO = ((Closing - R) / Closing) * 100
 *
 * @param closings closing values.
 * @return cfo values.
 */
export declare function chandeForecastOscillator(closings: number[]): number[];
/**
 * Moving Chande Forecast Oscillator calculates based on
 * the given period.
 *
 * The Chande Forecast Oscillator developed by Tushar Chande The Forecast
 * Oscillator plots the percentage difference between the closing price and
 * the n-period linear regression forecasted price. The oscillator is above
 * zero when the forecast price is greater than the closing price and less
 * than zero if it is below.
 *
 * R = Linreg(Closing)
 * CFO = ((Closing - R) / Closing) * 100
 *
 * @param period window period.
 * @param closings closing values.
 * @return moving cfo.
 */
export declare function movingChandeForecastOscillator(period: number, closings: number[]): number[];
