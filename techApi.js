// const indicatorApi = require("technicalindicators");
// const indicatorts = require("indicatorts");

// async function indicate(historicalData) {
//     try {
//         if (!historicalData || !Array.isArray(historicalData) || historicalData.length === 0) {
//             throw new Error("Invalid or empty historical data");
//         }

//         let ohlcv = {
//             open: [],
//             high: [],
//             low: [],
//             close: [],
//             volume: []
//         };

//         for (const x of historicalData) {
//             ohlcv.open.push(x[1]);
//             ohlcv.high.push(x[2]);
//             ohlcv.low.push(x[3]);
//             ohlcv.close.push(x[4]);
//             ohlcv.volume.push(x[5]);
//         }

//         // Define indicators
//         const SMA = indicatorApi.SMA;
//         const EMA = indicatorApi.EMA;
//         const ADX = indicatorApi.ADX;
//         const RSI = indicatorApi.RSI;
//         const MACD = indicatorApi.MACD;
//         const StochasticOscillator = indicatorApi.Stochastic;
//         const ATR = indicatorApi.ATR;
//         const BollingerBands = indicatorApi.BollingerBands;
//         const VWAP = indicatorApi.VWAP;
//         const OBV = indicatorApi.OBV;
//         const IchimokuCloud = indicatorApi.IchimokuCloud;

//         // Define indicators from indicatorts
//         const MACD2 = indicatorts.macd;
//         const OBV2 = indicatorts.onBalanceVolume;
//         const RSI2 = indicatorts.rsi;

//         const indicators = {
//             SMA: {},
//             EMA: {},
//             VMA: {},
//             MACD: {},
//             ADX: {},
//             RSI: {},
//             StochOsc: {},
//             ATR: {},
//             BOLL: {},
//             VWAP: {},
//             OBV: {},
//             OBV2: {},
//             Ichimoku: {}
//         };

//         // Calculate indicators
//         const periods = [3, 5, 10, 13, 25, 50, 99];
//         for (const period of periods) {
//             indicators.SMA[period] = await SMA.calculate({ period, values: sliceIfPossible(ohlcv.close, period) });
//             indicators.EMA[period] = await EMA.calculate({ period, values: sliceIfPossible(ohlcv.close, period) });
//             indicators.VMA[period] = await SMA.calculate({ period, values: sliceIfPossible(ohlcv.volume, period) });
//         }

//         // MACD calculation
//         indicators.MACD = {
//             current: await MACD.calculate({
//                 values: sliceIfPossible(ohlcv.close, 32),
//                 fastPeriod: 12,
//                 slowPeriod: 26,
//                 signalPeriod: 9,
//                 SimpleMAOscillator: false,
//                 SimpleMASignal: false,
//             })[5],
//             yesterday: await MACD.calculate({
//                 values: sliceIfPossible(ohlcv.close, 33, 1),
//                 fastPeriod: 12,
//                 slowPeriod: 26,
//                 signalPeriod: 9,
//                 SimpleMAOscillator: false,
//                 SimpleMASignal: false,
//             })[5],
//             daybefore: await MACD.calculate({
//                 values: sliceIfPossible(ohlcv.close, 34, 2),
//                 fastPeriod: 12,
//                 slowPeriod: 26,
//                 signalPeriod: 9,
//                 SimpleMAOscillator: false,
//                 SimpleMASignal: false,
//             })[5],
//         };

//         // Other indicators calculation
//         indicators.ADX = ADX.calculate({ close: sliceIfPossible(ohlcv.close, 29), high: sliceIfPossible(ohlcv.high, 29), low: sliceIfPossible(ohlcv.low, 29), period: 14 })[1].adx;
//         indicators.RSI = RSI.calculate({ period: 14, values: sliceIfPossible(ohlcv.close, 23) })[8];
//         indicators.StochOsc = StochasticOscillator.calculate({ close: sliceIfPossible(ohlcv.close, 28), high: sliceIfPossible(ohlcv.high, 28), low: sliceIfPossible(ohlcv.low, 28), period: 14, signalPeriod: 3 })[14];
//         indicators.ATR = ATR.calculate({ close: sliceIfPossible(ohlcv.close, 40), high: sliceIfPossible(ohlcv.high, 40), low: sliceIfPossible(ohlcv.low, 40), period: 14 });
//         indicators.BOLL = {
//             1: BollingerBands.calculate({ period: 20, values: sliceIfPossible(ohlcv.close, 20), stdDev: 2 })[0],
//             // Add calculations for other periods similarly
//         };
//         indicators.VWAP = VWAP.calculate({
//             close: sliceIfPossible(ohlcv.close, 1),
//             high: sliceIfPossible(ohlcv.high, 1),
//             low: sliceIfPossible(ohlcv.low, 1),
//             open: [],
//             volume: sliceIfPossible(ohlcv.volume, 1)
//         });
//         indicators.OBV = OBV.calculate({ close: sliceIfPossible(ohlcv.close, 2), volume: sliceIfPossible(ohlcv.volume, 2) });
//         indicators.OBV2 = OBV2(sliceIfPossible(ohlcv.close, 9), sliceIfPossible(ohlcv.volume, 9));
//         indicators.Ichimoku = IchimokuCloud.calculate({
//             high: sliceIfPossible(ohlcv.high, 120),
//             low: sliceIfPossible(ohlcv.low, 120),
//             conversionPeriod: 20,
//             basePeriod: 60,
//             spanPeriod: 120,
//             displacement: 30
//         });

//         return indicators;
//     } catch (error) {
//         console.error("An error occurred while calculating indicators:", error.message);
//         return 0;
//     }
// }


// // Helper function to slice array if possible, otherwise return neutral data
// function sliceIfPossible(array, length, indicator) {
//     if (array.length >= length) {
//         return array.slice(-length);
//     } else {
//         // If the array length is less than required, return neutral data based on indicator
//         switch (indicator) {
//             case 'RSI':
//                 return Array(length).fill(50); // RSI 50 is considered neutral
//             case 'MACD':
//                 return {
//                     current: 0,
//                     yesterday: 0,
//                     daybefore: 0
//                 }; // Neutral MACD histogram values
//             case 'ADX':
//                 return { adx: 25 }; // ADX 25 is considered neutral
//             case 'StochOsc':
//                 return { k: 50, d: 50 }; // Neutral values for Stochastic Oscillator
//             case 'ATR':
//                 return 0; // Neutral ATR value
//             case 'BOLL':
//                 return { upper: 0, middle: 0, lower: 0 }; // Neutral Bollinger Bands
//             // Add cases for other indicators as needed
//             default:
//                 return Array(length).fill(0); // Default to filling with zeros
//         }
//     }
// }
































































































































































































































































// const indicatorApi = require("technicalindicators")
// const indicatorts = require("indicatorts")

// async function indicate(historicalData) {

//     try {


//             let ohlcv = {
//                 open: [],
//                 high: [],
//                 low: [],
//                 close: [],
//                 volume: []
//             }

//             for (const x of historicalData) {
//                 ohlcv.open.push(x[1])
//                 ohlcv.high.push(x[2])
//                 ohlcv.low.push(x[3])
//                 ohlcv.close.push(x[4])
//                 ohlcv.volume.push(x[5])
//             }


//             // trend indicator 

//             const SMA = indicatorApi.SMA
//             const EMA = indicatorApi.EMA

//             // strength of trend
//             const ADX = indicatorApi.ADX  

//             // momentum indicator 
//             const RSI = indicatorApi.RSI
//             const MACD = indicatorApi.MACD
//             const stochOsc = indicatorApi.Stochastic

//             // volatility indicator

//             const ATR = indicatorApi.ATR
//             const Boll = indicatorApi.BollingerBands
            
//             // volume indicator 

        
//             const VWAP = indicatorApi.VWAP
//             const OBV = indicatorApi.OBV


//             //

//             const ichimoku = indicatorApi.IchimokuCloud;
            

//             // From indicatorts
//             const MACD2 = indicatorts.macd
//             const OBV2 = indicatorts.onBalanceVolume
//             const RSI2 = indicatorts.rsi



//             const indicators = {
//                 SMA: {
//                     today:  {
//                         3: await SMA.calculate({period : 3, values : ohlcv.close.slice(ohlcv.close.length - 3)}),
//                         5: await SMA.calculate({period : 5, values : ohlcv.close.slice(ohlcv.close.length - 5)}),
//                         10: await SMA.calculate({period : 10, values : ohlcv.close.slice(ohlcv.close.length - 10)}),
//                         13: await SMA.calculate({period : 13, values : ohlcv.close.slice(ohlcv.close.length - 13)}),
//                         25: await SMA.calculate({period : 25, values : ohlcv.close.slice(ohlcv.close.length - 25)}),
//                         50: await SMA.calculate({period : 50, values : ohlcv.close.slice(ohlcv.close.length - 50)}),
//                         99: await SMA.calculate({period : 99, values : ohlcv.close.slice(ohlcv.close.length - 99)}),
//                     },

//                     yesterday: {
//                         3: await SMA.calculate({period : 3, values : ohlcv.close.slice(ohlcv.close.length - 4, (ohlcv.close.length - 1))}),
//                         5: await SMA.calculate({period : 5, values : ohlcv.close.slice(ohlcv.close.length - 6, (ohlcv.close.length - 1))}),
//                         10: await SMA.calculate({period : 10, values : ohlcv.close.slice(ohlcv.close.length - 11, (ohlcv.close.length - 1))}),
//                         13: await SMA.calculate({period : 13, values : ohlcv.close.slice(ohlcv.close.length - 14, (ohlcv.close.length - 1))}),
//                         25: await SMA.calculate({period : 25, values : ohlcv.close.slice(ohlcv.close.length - 26, (ohlcv.close.length - 1))}),
//                         50: await SMA.calculate({period : 50, values : ohlcv.close.slice(ohlcv.close.length - 51, (ohlcv.close.length - 1))}),
//                         99: await SMA.calculate({period : 99, values : ohlcv.close.slice(ohlcv.close.length - 100, (ohlcv.close.length - 1))}),
//                     },

//                     daybefore: {
//                         3: await SMA.calculate({period : 3, values : ohlcv.close.slice(ohlcv.close.length - 5, (ohlcv.close.length - 2))}),
//                         5: await SMA.calculate({period : 5, values : ohlcv.close.slice(ohlcv.close.length - 7, (ohlcv.close.length - 2))}),
//                         10: await SMA.calculate({period : 10, values : ohlcv.close.slice(ohlcv.close.length - 12, (ohlcv.close.length - 2))}),
//                         13: await SMA.calculate({period : 13, values : ohlcv.close.slice(ohlcv.close.length - 15, (ohlcv.close.length - 2))}),
//                         25: await SMA.calculate({period : 25, values : ohlcv.close.slice(ohlcv.close.length - 27,(ohlcv.close.length - 2))}),
//                         50: await SMA.calculate({period : 50, values : ohlcv.close.slice(ohlcv.close.length - 52, (ohlcv.close.length - 2))}),
//                         99: await SMA.calculate({period : 99, values : ohlcv.close.slice(ohlcv.close.length - 101, (ohlcv.close.length - 2))}),
//                     }   
//                 },
//                 EMA: {
//                     3: await EMA.calculate({period : 3, values : ohlcv.close.slice(ohlcv.close.length - 3)}),
//                     5: await EMA.calculate({period : 5, values : ohlcv.close.slice(ohlcv.close.length - 5)}),
//                     10: await EMA.calculate({period : 10, values : ohlcv.close.slice(ohlcv.close.length - 10)}),
//                     13: await EMA.calculate({period : 13, values : ohlcv.close.slice(ohlcv.close.length - 13)}),
//                     25: await EMA.calculate({period : 25, values : ohlcv.close.slice(ohlcv.close.length - 25)}),
//                     50: await EMA.calculate({period : 50, values : ohlcv.close.slice(ohlcv.close.length - 50)}),
//                     99: await EMA.calculate({period : 99, values : ohlcv.close.slice(ohlcv.close.length - 99)}),
//                 },
//                 VMA: {
//                     3: await SMA.calculate({period : 3, values : ohlcv.volume.slice(ohlcv.volume.length - 3)}),
//                     5: await SMA.calculate({period : 5, values : ohlcv.volume.slice(ohlcv.volume.length - 5)}),
//                     10: await SMA.calculate({period : 10, values : ohlcv.volume.slice(ohlcv.volume.length - 10)}),
//                     13: await SMA.calculate({period : 13, values : ohlcv.volume.slice(ohlcv.volume.length - 13)}),
//                     25: await SMA.calculate({period : 25, values : ohlcv.volume.slice(ohlcv.volume.length - 25)}),
//                     50: await SMA.calculate({period : 50, values : ohlcv.volume.slice(ohlcv.volume.length - 50)}),
//                     99: await SMA.calculate({period : 99, values : ohlcv.volume.slice(ohlcv.volume.length - 99)}),
//                 },

//                 //not very accurate
//                 MACD: {
//                     current: await  MACD.calculate({
//                         values : ohlcv.close.slice(ohlcv.close.length - 32),
//                         fastPeriod: 12,
//                         slowPeriod: 26,
//                         signalPeriod: 9,
//                         SimpleMAOscillator: false,
//                         SimpleMASignal: false,
//                     })[5],
//                     yesterday: await MACD.calculate({
//                         values : ohlcv.close.slice((ohlcv.close.length - 33),(ohlcv.close.length - 1)),
//                         fastPeriod: 12,
//                         slowPeriod: 26,
//                         signalPeriod: 9,
//                         SimpleMAOscillator: false,
//                         SimpleMASignal: false,
//                     })[5],
//                     daybefore: await MACD.calculate({
//                         values : ohlcv.close.slice((ohlcv.close.length - 34),(ohlcv.close.length - 2 )),
//                         fastPeriod: 12,
//                         slowPeriod: 26,
//                         signalPeriod: 9,
//                         SimpleMAOscillator: false,
//                         SimpleMASignal: false,
//                     })[5],
//                 },

//                 // MACD2: await MACD2(ohlcv.close.slice(ohlcv.close.length - 26)),

//                 //mot very accurate
//                 ADX: ADX.calculate({ close: ohlcv.close.slice(ohlcv.close.length - 29), 
//                                     high: ohlcv.high.slice(ohlcv.high.length - 29),
//                                     low: ohlcv.low.slice(ohlcv.low.length - 29),
//                                     period: 14 })[1].adx,
//                 RSI: RSI.calculate({ period: 14, values: ohlcv.close.slice(ohlcv.close.length - 23,ohlcv.close.length - 0)})[8],
//                 StochOsc : stochOsc.calculate({ close: ohlcv.close.slice(ohlcv.close.length - 28), 
//                     high: ohlcv.high.slice(ohlcv.high.length - 28),
//                     low: ohlcv.low.slice(ohlcv.low.length - 28),
//                     period: 14, signalPeriod: 3}) [14],
//                 ATR: ATR.calculate({ close: ohlcv.close.slice(ohlcv.close.length - 40), 
//                     high: ohlcv.high.slice(ohlcv.high.length - 40),
//                     low: ohlcv.low.slice(ohlcv.low.length - 40),
//                     period: 14}),
//                 BOLL: {
//                     1:  Boll.calculate({ period: 20, values: ohlcv.close.slice(ohlcv.close.length - 20), stdDev: 2})[0],
//                     2:  Boll.calculate({ period: 20, values: ohlcv.close.slice(ohlcv.close.length - 21, ohlcv.close.length - 1), stdDev: 2})[0],
//                     3:  Boll.calculate({ period: 20, values: ohlcv.close.slice(ohlcv.close.length - 22, ohlcv.close.length - 2), stdDev: 2})[0],
//                     4:  Boll.calculate({ period: 20, values: ohlcv.close.slice(ohlcv.close.length - 23, ohlcv.close.length - 3), stdDev: 2})[0],
//                     5:  Boll.calculate({ period: 20, values: ohlcv.close.slice(ohlcv.close.length - 24, ohlcv.close.length - 4), stdDev: 2})[0],
//                     6:  Boll.calculate({ period: 20, values: ohlcv.close.slice(ohlcv.close.length - 25, ohlcv.close.length - 5), stdDev: 2})[0],
//                     7:  Boll.calculate({ period: 20, values: ohlcv.close.slice(ohlcv.close.length - 26, ohlcv.close.length - 6), stdDev: 2})[0],
//                     8:  Boll.calculate({ period: 20, values: ohlcv.close.slice(ohlcv.close.length - 27, ohlcv.close.length - 7), stdDev: 2})[0],
//                 },
//                 VWAP: VWAP.calculate({ close: ohlcv.close.slice(ohlcv.close.length - 1), 
//                     high: ohlcv.high.slice(ohlcv.high.length - 1),
//                     low: ohlcv.low.slice(ohlcv.low.length - 1),
//                     open: [],
//                     volume: ohlcv.volume.slice(ohlcv.volume.length - 1)
//                 }),
//                 OBV: OBV.calculate({close: ohlcv.close.slice(ohlcv.close.length -2), volume: ohlcv.volume.slice(ohlcv.volume.length - 2)}),
//                 OBV2: OBV2(ohlcv.close.slice(ohlcv.close.length -9), ohlcv.volume.slice(ohlcv.volume.length - 9)),
//                 Ichimoku : ichimoku.calculate({high: ohlcv.high.slice(ohlcv.high.length -120), 
//                     low: ohlcv.low.slice(ohlcv.low.length -120),
//                     conversionPeriod: 20,
//                     basePeriod: 60,
//                     spanPeriod: 120,
//                     displacement: 30
//                 })
//             }
        


        


//         return indicators
        
//     } catch (error) {
//         return 0
//     }

// }





// module.exports = {indicate}


// const indicatorApi = require("technicalindicators");
// const indicatorts = require("indicatorts");

// async function indicate(historicalData) {
//     try {
//         if (!historicalData || !Array.isArray(historicalData) || historicalData.length === 0) {
//             throw new Error("Invalid or empty historical data");
//         }

//         let ohlcv = {
//             open: [],
//             high: [],
//             low: [],
//             close: [],
//             volume: []
//         };

//         for (const x of historicalData) {
//             ohlcv.open.push(x[1]);
//             ohlcv.high.push(x[2]);
//             ohlcv.low.push(x[3]);
//             ohlcv.close.push(x[4]);
//             ohlcv.volume.push(x[5]);
//         }

//         // Define indicators
//         const SMA = indicatorApi.SMA;
//         const EMA = indicatorApi.EMA;
//         const ADX = indicatorApi.ADX;
//         const RSI = indicatorApi.RSI;
//         const MACD = indicatorApi.MACD;
//         const StochasticOscillator = indicatorApi.Stochastic;
//         const ATR = indicatorApi.ATR;
//         const BollingerBands = indicatorApi.BollingerBands;
//         const VWAP = indicatorApi.VWAP;
//         const OBV = indicatorApi.OBV;
//         const IchimokuCloud = indicatorApi.IchimokuCloud;

//         // Define indicators from indicatorts
//         const MACD2 = indicatorts.macd;
//         const OBV2 = indicatorts.onBalanceVolume;
//         const RSI2 = indicatorts.rsi;

//         const indicators = {
//             SMA: {},
//             EMA: {},
//             VMA: {},
//             MACD: {},
//             ADX: {},
//             RSI: {},
//             StochOsc: {},
//             ATR: {},
//             BOLL: {},
//             VWAP: {},
//             OBV: {},
//             OBV2: {},
//             Ichimoku: {}
//         };

//         // Calculate indicators
//         const periods = [3, 5, 10, 13, 25, 50, 99];
//         for (const period of periods) {
//             indicators.SMA[period] = await SMA.calculate({ period, values: sliceIfPossible(ohlcv.close, period) });
//             indicators.EMA[period] = await EMA.calculate({ period, values: sliceIfPossible(ohlcv.close, period) });
//             indicators.VMA[period] = await SMA.calculate({ period, values: sliceIfPossible(ohlcv.volume, period) });
//         }

//         // MACD calculation
//         indicators.MACD = {
//             current: await MACD.calculate({
//                 values: sliceIfPossible(ohlcv.close, 32),
//                 fastPeriod: 12,
//                 slowPeriod: 26,
//                 signalPeriod: 9,
//                 SimpleMAOscillator: false,
//                 SimpleMASignal: false,
//             })[5],
//             yesterday: await MACD.calculate({
//                 values: sliceIfPossible(ohlcv.close, 33, 1),
//                 fastPeriod: 12,
//                 slowPeriod: 26,
//                 signalPeriod: 9,
//                 SimpleMAOscillator: false,
//                 SimpleMASignal: false,
//             })[5],
//             daybefore: await MACD.calculate({
//                 values: sliceIfPossible(ohlcv.close, 34, 2),
//                 fastPeriod: 12,
//                 slowPeriod: 26,
//                 signalPeriod: 9,
//                 SimpleMAOscillator: false,
//                 SimpleMASignal: false,
//             })[5],
//         };

//         // Other indicators calculation
//         indicators.ADX = ADX.calculate({ close: sliceIfPossible(ohlcv.close, 29), high: sliceIfPossible(ohlcv.high, 29), low: sliceIfPossible(ohlcv.low, 29), period: 14 })[1].adx;
//         indicators.RSI = RSI.calculate({ period: 14, values: sliceIfPossible(ohlcv.close, 23) })[8];
//         indicators.StochOsc = StochasticOscillator.calculate({ close: sliceIfPossible(ohlcv.close, 28), high: sliceIfPossible(ohlcv.high, 28), low: sliceIfPossible(ohlcv.low, 28), period: 14, signalPeriod: 3 })[14];
//         indicators.ATR = ATR.calculate({ close: sliceIfPossible(ohlcv.close, 40), high: sliceIfPossible(ohlcv.high, 40), low: sliceIfPossible(ohlcv.low, 40), period: 14 });
//         indicators.BOLL = {
//             1: BollingerBands.calculate({ period: 20, values: sliceIfPossible(ohlcv.close, 20), stdDev: 2 })[0],
//             // Add calculations for other periods similarly
//         };
//         indicators.VWAP = VWAP.calculate({
//             close: sliceIfPossible(ohlcv.close, 1),
//             high: sliceIfPossible(ohlcv.high, 1),
//             low: sliceIfPossible(ohlcv.low, 1),
//             open: [],
//             volume: sliceIfPossible(ohlcv.volume, 1)
//         });
//         indicators.OBV = OBV.calculate({ close: sliceIfPossible(ohlcv.close, 2), volume: sliceIfPossible(ohlcv.volume, 2) });
//         indicators.OBV2 = OBV2(sliceIfPossible(ohlcv.close, 9), sliceIfPossible(ohlcv.volume, 9));
//         indicators.Ichimoku = IchimokuCloud.calculate({
//             high: sliceIfPossible(ohlcv.high, 120),
//             low: sliceIfPossible(ohlcv.low, 120),
//             conversionPeriod: 20,
//             basePeriod: 60,
//             spanPeriod: 120,
//             displacement: 30
//         });

//         return indicators;
//     } catch (error) {
//         console.error("An error occurred while calculating indicators:", error.message);
//         return 0;
//     }
// }


// // Helper function to slice array if possible, otherwise return neutral data
// function sliceIfPossible(array, length, indicator) {
//     if (array.length >= length) {
//         return array.slice(-length);
//     } else {
//         // If the array length is less than required, return neutral data based on indicator
//         switch (indicator) {
//             case 'RSI':
//                 return Array(length).fill(50); // RSI 50 is considered neutral
//             case 'MACD':
//                 return {
//                     current: 0,
//                     yesterday: 0,
//                     daybefore: 0
//                 }; // Neutral MACD histogram values
//             case 'ADX':
//                 return { adx: 25 }; // ADX 25 is considered neutral
//             case 'StochOsc':
//                 return { k: 50, d: 50 }; // Neutral values for Stochastic Oscillator
//             case 'ATR':
//                 return 0; // Neutral ATR value
//             case 'BOLL':
//                 return { upper: 0, middle: 0, lower: 0 }; // Neutral Bollinger Bands
//             // Add cases for other indicators as needed
//             default:
//                 return Array(length).fill(0); // Default to filling with zeros
//         }
//     }
// }
































































































































































































































































const indicatorApi = require("technicalindicators")
const indicatorts = require("indicatorts")

async function indicate(historicalData) {

    try {


            let ohlcv = {
                open: [],
                high: [],
                low: [],
                close: [],
                volume: []
            }

            for (const x of historicalData) {
                ohlcv.open.push(x[1])
                ohlcv.high.push(x[2])
                ohlcv.low.push(x[3])
                ohlcv.close.push(x[4])
                ohlcv.volume.push(x[5])
            }


            // trend indicator 

            const SMA = indicatorApi.SMA
            const EMA = indicatorApi.EMA

            // strength of trend
            const ADX = indicatorApi.ADX  

            // momentum indicator 
            const RSI = indicatorApi.RSI
            const MACD = indicatorApi.MACD
            const stochOsc = indicatorApi.Stochastic

            // volatility indicator

            const ATR = indicatorApi.ATR
            const Boll = indicatorApi.BollingerBands
            
            // volume indicator 

        
            const VWAP = indicatorApi.VWAP
            const OBV = indicatorApi.OBV


            //

            const ichimoku = indicatorApi.IchimokuCloud;
            

            // From indicatorts
            const MACD2 = indicatorts.macd
            const OBV2 = indicatorts.onBalanceVolume
            const RSI2 = indicatorts.rsi



            const indicators = {
                SMA: {
                    today:  {
                        3: await SMA.calculate({period : 3, values : ohlcv.close})[SMA.calculate({period : 3, values : ohlcv.close}).length - 1],
                        5: await SMA.calculate({period : 5, values : ohlcv.close})[SMA.calculate({period : 5, values : ohlcv.close}).length - 1],
                        10: await SMA.calculate({period : 10, values : ohlcv.close})[SMA.calculate({period : 10, values : ohlcv.close}).length - 1],
                        13: await SMA.calculate({period : 13, values : ohlcv.close})[SMA.calculate({period : 13, values : ohlcv.close}).length - 1],
                        25: await SMA.calculate({period : 25, values : ohlcv.close})[SMA.calculate({period : 25, values : ohlcv.close}).length - 1],
                        50: await SMA.calculate({period : 50, values : ohlcv.close})[SMA.calculate({period : 50, values : ohlcv.close}).length - 1],
                        99: await SMA.calculate({period : 99, values : ohlcv.close})[SMA.calculate({period : 99, values : ohlcv.close}).length - 1],
                    },

                    yesterday: {
                        3: await SMA.calculate({period : 3, values : ohlcv.close})[SMA.calculate({period : 3, values : ohlcv.close}).length - 2],
                        5: await SMA.calculate({period : 5, values : ohlcv.close})[SMA.calculate({period : 5, values : ohlcv.close}).length - 2],
                        10: await SMA.calculate({period : 10, values : ohlcv.close})[SMA.calculate({period : 10, values : ohlcv.close}).length - 2],
                        13: await SMA.calculate({period : 13, values : ohlcv.close})[SMA.calculate({period : 13, values : ohlcv.close}).length - 2],
                        25: await SMA.calculate({period : 25, values : ohlcv.close})[SMA.calculate({period : 25, values : ohlcv.close}).length - 2],
                        50: await SMA.calculate({period : 50, values : ohlcv.close})[SMA.calculate({period : 50, values : ohlcv.close}).length - 2],
                        99: await SMA.calculate({period : 99, values : ohlcv.close})[SMA.calculate({period : 99, values : ohlcv.close}).length - 2],
                    },

                    daybefore: {
                        3: await SMA.calculate({period : 3, values : ohlcv.close})[SMA.calculate({period : 3, values : ohlcv.close}).length - 3],
                        5: await SMA.calculate({period : 5, values : ohlcv.close})[SMA.calculate({period : 5, values : ohlcv.close}).length - 3],
                        10: await SMA.calculate({period : 10, values : ohlcv.close})[SMA.calculate({period : 10, values : ohlcv.close}).length - 3],
                        13: await SMA.calculate({period : 13, values : ohlcv.close})[SMA.calculate({period : 13, values : ohlcv.close}).length - 3],
                        25: await SMA.calculate({period : 25, values : ohlcv.close})[SMA.calculate({period : 25, values : ohlcv.close}).length - 3],
                        50: await SMA.calculate({period : 50, values : ohlcv.close})[SMA.calculate({period : 50, values : ohlcv.close}).length - 3],
                        99: await SMA.calculate({period : 99, values : ohlcv.close})[SMA.calculate({period : 99, values : ohlcv.close}).length - 3],
                    }   
                },
                // EMA: {
                //     3: await EMA.calculate({period : 3, values : ohlcv.close}),
                //     5: await EMA.calculate({period : 5, values : ohlcv.close}),
                //     10: await EMA.calculate({period : 10, values : ohlcv.close}),
                //     13: await EMA.calculate({period : 13, values : ohlcv.close}),
                //     25: await EMA.calculate({period : 25, values : ohlcv.close}),
                //     50: await EMA.calculate({period : 50, values : ohlcv.close}),
                //     99: await EMA.calculate({period : 99, values : ohlcv.close}),
                // },
                // VMA: {
                //     3: await SMA.calculate({period : 3, values : ohlcv.volume}),
                //     5: await SMA.calculate({period : 5, values : ohlcv.volume}),
                //     10: await SMA.calculate({period : 10, values : ohlcv.volume}),
                //     13: await SMA.calculate({period : 13, values : ohlcv.volume}),
                //     25: await SMA.calculate({period : 25, values : ohlcv.volume}),
                //     50: await SMA.calculate({period : 50, values : ohlcv.volume}),
                //     99: await SMA.calculate({period : 99, values : ohlcv.volume}),
                // },

                // //not very accurate
                MACD: {
                    current: await  MACD.calculate({
                        values : ohlcv.close,
                        fastPeriod: 12,
                        slowPeriod: 26,
                        signalPeriod: 9,
                        SimpleMAOscillator: false,
                        SimpleMASignal: false,
                    })[MACD.calculate({
                        values : ohlcv.close,
                        fastPeriod: 12,
                        slowPeriod: 26,
                        signalPeriod: 9,
                        SimpleMAOscillator: false,
                        SimpleMASignal: false,
                    }).length - 1]
                },



                // //mot very accurate
                ADX: await ADX.calculate({ close: ohlcv.close, 
                                    high: ohlcv.high,
                                    low: ohlcv.low,
                                    period: 14 })[ADX.calculate({ close: ohlcv.close, 
                                        high: ohlcv.high,
                                        low: ohlcv.low,
                                        period: 14 }).length - 1],
                RSI: await  RSI.calculate({ period: 14, values: ohlcv.close})[RSI.calculate({ period: 14, values: ohlcv.close}).length - 1],
                StochOsc :await  stochOsc.calculate({ close: ohlcv.close, 
                    high: ohlcv.high,
                    low: ohlcv.low,
                    period: 14, signalPeriod: 3})[stochOsc.calculate({ close: ohlcv.close, 
                        high: ohlcv.high,
                        low: ohlcv.low,
                        period: 14, signalPeriod: 3}).length - 1],
                ATR: ATR.calculate({ close: ohlcv.close ,
                    high: ohlcv.high,
                    low: ohlcv.low,
                    period: 14})[ ATR.calculate({ close: ohlcv.close ,
                        high: ohlcv.high,
                        low: ohlcv.low,
                        period: 14}).length - 1],

                BOLL: {
                    1:  await Boll.calculate({ period: 20, values: ohlcv.close, stdDev: 2}).reverse()[0],
                    2:  await Boll.calculate({ period: 20, values: ohlcv.close, stdDev: 2}).reverse()[1],
                    3:  await Boll.calculate({ period: 20, values: ohlcv.close, stdDev: 2}).reverse()[2],
                    4:  await Boll.calculate({ period: 20, values: ohlcv.close, stdDev: 2}).reverse()[3],
                    5:  await Boll.calculate({ period: 20, values: ohlcv.close, stdDev: 2}).reverse()[4],
                    6:  await Boll.calculate({ period: 20, values: ohlcv.close, stdDev: 2}).reverse()[5],
                    7:  await Boll.calculate({ period: 20, values: ohlcv.close, stdDev: 2}).reverse()[6],
                    8:  await Boll.calculate({ period: 20, values: ohlcv.close, stdDev: 2}).reverse()[7],

                },
            
                // VWAP: await VWAP.calculate({ close: ohlcv.close, 
                //     high: ohlcv.high,
                //     low: ohlcv.low,
                //     open: ohlcv.open,
                //     volume: ohlcv.volume
                // })[450],

                // OBV: await OBV.calculate({close: ohlcv.close, volume: ohlcv.volume}) [ OBV.calculate({close: ohlcv.close, volume: ohlcv.volume}).length - 1],
                // OBV2: await OBV2(ohlcv.close, ohlcv.volume)[OBV2(ohlcv.close, ohlcv.volume).length -1],
                // Ichimoku : ichimoku.calculate({high: ohlcv.high, 
                //     low: ohlcv.low,
                //     conversionPeriod: 20,
                //     basePeriod: 60,
                //     spanPeriod: 120,
                //     displacement: 30
                // })
            }
        


        


        return indicators
        
    } catch (error) {
        return 0
    }

}





module.exports = {indicate}