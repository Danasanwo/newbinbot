const fibb = require('./fibonnaci');
const techApi = require('./techApi');
const prioritizer = require('./prioritizer');
const getHistoricalData = require('./getHistoricalData');
const random = require('./random');
const calculateRSI = require('./calculateRSI')

async function compileAlgo(binance) {

    const getAllMarket = await getHistoricalData.getAllMarket(binance);
    const symBolData = [];

    await Promise.all(getAllMarket.map(async symbol => {
        try {
            const [historicalDataOneHour, historicalDataFourHour, historicalDataOneDay] = await Promise.all([
                binance.fetchOHLCV(symbol, '1h'),
                binance.fetchOHLCV(symbol, '4h'),
                binance.fetchOHLCV(symbol, '1d')
            ]);
    
            // Remove the most recent data from each historical dataset
            const [trimmedDataOneHour, trimmedDataFourHour, trimmedDataOneDay] = [
                historicalDataOneHour.slice(0, -24),
                historicalDataFourHour.slice(0, -4),
                historicalDataOneDay.slice(0, -1)
            ];
    
            const [rsi1h, rsi4h, rsi1d] = await Promise.all([
                calculateRSI.calculateRSI(historicalDataOneHour),
                calculateRSI.calculateRSI(historicalDataFourHour),
                calculateRSI.calculateRSI(historicalDataOneDay)
            ])
    
            const [oneHourCandlesticks, fourHourCandlesticks, oneDayCandlesticks, yesterdayCandleSticks] = await Promise.all([
                random.analyseCandlesticks(historicalDataOneHour),
                random.analyseCandlesticks(historicalDataFourHour),
                random.analyseCandlesticks(historicalDataOneDay),
                random.analyseCandlesticks(trimmedDataOneDay)
            ]);
    
        
    
    
            const [oneHourIndicators, fourHourIndicators, oneDayIndicators, yesterdayIndicators] = await Promise.all([
                techApi.indicate(historicalDataOneHour),
                techApi.indicate(historicalDataFourHour),
                techApi.indicate(historicalDataOneDay),
                techApi.indicate(trimmedDataOneDay)
            ]);
    
            const fibonnaci = await fibb.analyseFibonacci(historicalDataOneDay);
    
            const [prioritizeOneHour, prioritizeFourHours, prioritizeOneDay, prioritizeYesterday] = await Promise.all([
                prioritizer.prioritizeMarkets(oneHourCandlesticks, oneHourIndicators, historicalDataOneHour),
                prioritizer.prioritizeMarkets(fourHourCandlesticks, fourHourIndicators, historicalDataFourHour),
                prioritizer.prioritizeMarkets(oneDayCandlesticks, oneDayIndicators, historicalDataOneDay),
                prioritizer.prioritizeMarkets(yesterdayCandleSticks, yesterdayIndicators, trimmedDataOneDay)
            ]);
    
            const combinePri = await prioritizer.combineTimePeriod(prioritizeOneHour, prioritizeFourHours, prioritizeOneDay, prioritizeYesterday);
    
            let fourHourCandle = fourHourCandlesticks.bullish - fourHourCandlesticks.bearish
            let oneDayCandle = oneDayCandlesticks.bullish - oneDayCandlesticks.bullish
    
            // symBolData.push([symbol, combinePri, historicalDataOneHour[historicalDataOneHour.length - 1][4], `RSI4h: ${fourHourIndicators.RSI}`, `RSI1d: ${oneDayIndicators.RSI}`]);
    
            symBolData.push([symbol, combinePri, historicalDataOneHour[historicalDataOneHour.length - 1][4], rsi4h, rsi1d, fourHourCandlesticks, oneDayCandlesticks] );
    

            
        } catch (error) {
            console.log(`could not get algorithmic value for ${symbol}`);
        }
   
    }));

    symBolData.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));

 

    return symBolData;
}















// async function compileAlgo(binance) {
//     // const getAllMarket = await getHistoricalData.getAllMarket(binance);
//     const getAllMarket =  ['BTCUSDT']
//     const symBolData = [];

//     await Promise.all(getAllMarket.map(async symbol => {
//         const [historicalDataOneHour, historicalDataFourHour, historicalDataOneDay] = await Promise.all([
//             binance.fetchOHLCV(symbol, '1h'),
//             binance.fetchOHLCV(symbol, '4h'),
//             binance.fetchOHLCV(symbol, '1d')
//         ]);

//         // Remove the most recent data from each historical dataset
//         const [trimmedDataOneHour, trimmedDataFourHour, trimmedDataOneDay] = [
//             historicalDataOneHour.slice(0, -28),
//             historicalDataFourHour.slice(0, -16),
//             historicalDataOneDay.slice(0, -3)
//         ];

//         const [oneHourCandlesticks, fourHourCandlesticks, oneDayCandlesticks] = await Promise.all([
//             random.analyseCandlesticks(trimmedDataOneHour),
//             random.analyseCandlesticks(trimmedDataFourHour),
//             random.analyseCandlesticks(trimmedDataOneDay)
//         ]);

//         const [oneHourIndicators, fourHourIndicators, oneDayIndicators] = await Promise.all([
//             techApi.indicate(trimmedDataOneHour),
//             techApi.indicate(trimmedDataFourHour),
//             techApi.indicate(trimmedDataOneDay)
//         ]);

//         const fibonnaci = await fibb.analyseFibonacci(trimmedDataOneDay);

//         const [prioritizeOneHour, prioritizeFourHours, prioritizeOneDay] = await Promise.all([
//             prioritizer.prioritizeMarkets(oneHourCandlesticks, oneHourIndicators, trimmedDataOneHour),
//             prioritizer.prioritizeMarkets(fourHourCandlesticks, fourHourIndicators, trimmedDataFourHour),
//             prioritizer.prioritizeMarkets(oneDayCandlesticks, oneDayIndicators, trimmedDataOneDay)
//         ]);

//         const combinePri = await prioritizer.combineTimePeriod(prioritizeOneHour, prioritizeFourHours, prioritizeOneDay);

//         symBolData.push([symbol, combinePri, trimmedDataOneHour[trimmedDataOneHour.length - 1][4]]);
//     }));

//     symBolData.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));

//     return symBolData;

// }

module.exports = {
    compileAlgo
};


