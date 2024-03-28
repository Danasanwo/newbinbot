/**
 * Ichimoku cloud result object.
 */
export interface IchimokuCloudResult {
    conversionLine: number[];
    baseLine: number[];
    leadingSpanA: number[];
    leadingSpanB: number[];
    laggingSpan: number[];
}
/**
 * Ichimoku Cloud. Also known as Ichimoku Kinko Hyo, is a versatile indicator
 * that defines support and resistence, identifies trend direction, gauges
 * momentum, and provides trading signals.
 *
 * Tenkan-sen (Conversion Line) = (9-Period High + 9-Period Low) / 2
 * Kijun-sen (Base Line) = (26-Period High + 26-Period Low) / 2
 * Senkou Span A (Leading Span A) = (Conversion Line + Base Line) / 2
 * Senkou Span B (Leading Span B) = (52-Period High + 52-Period Low) / 2
 * Chikou Span (Lagging Span) = Closing plotted 26 days in the past.
 *
 * @param highs high values.
 * @param lows low values.
 * @param closings closing values.
 * @return ichimoku cloud result object.
 */
export declare function ichimokuCloud(highs: number[], lows: number[], closings: number[]): IchimokuCloudResult;
