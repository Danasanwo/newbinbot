const fibb = require('./fibonnaci');
const techApi = require('./techApi');
const prioritizer = require('./prioritizer');
const getHistoricalData = require('./getHistoricalData');
const random = require('./random');

async function compileAlgo(binance) {
    const getAllMarket = await getHistoricalData.getAllMarket(binance);
    const symBolData = [];

    await Promise.all(getAllMarket.slice(0,180).map(async symbol => {
        const [historicalDataOneHour, historicalDataFourHour, historicalDataOneDay] = await Promise.all([
            binance.fetchOHLCV(symbol, '1h'),
            binance.fetchOHLCV(symbol, '4h'),
            binance.fetchOHLCV(symbol, '1d')
        ]);

        const [oneHourCandlesticks, fourHourCandlesticks, oneDayCandlesticks] = await Promise.all([
            random.analyseCandlesticks(historicalDataOneHour),
            random.analyseCandlesticks(historicalDataFourHour),
            random.analyseCandlesticks(historicalDataOneDay)
        ]);

        const [oneHourIndicators, fourHourIndicators, oneDayIndicators] = await Promise.all([
            techApi.indicate(historicalDataOneHour),
            techApi.indicate(historicalDataFourHour),
            techApi.indicate(historicalDataOneDay)
        ]);

        const fibonnaci = await fibb.analyseFibonacci(historicalDataOneDay);

        const [prioritizeOneHour, prioritizeFourHours, prioritizeOneDay] = await Promise.all([
            prioritizer.prioritizeMarkets(oneHourCandlesticks, oneHourIndicators, historicalDataOneHour),
            prioritizer.prioritizeMarkets(fourHourCandlesticks, fourHourIndicators, historicalDataFourHour),
            prioritizer.prioritizeMarkets(oneDayCandlesticks, oneDayIndicators, historicalDataOneDay)
        ]);

        const combinePri = await prioritizer.combineTimePeriod(prioritizeOneHour, prioritizeFourHours, prioritizeOneDay);

        symBolData.push([symbol, combinePri, historicalDataOneHour[historicalDataOneHour.length - 1][4]]);
    }));

    symBolData.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));

    return symBolData;
}

module.exports = {
    compileAlgo
};


