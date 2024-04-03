const ccxt = require('ccxt')

async function getHistoricalData(symbol) {

    try {
             
    let historicalDataOneHour= await binance.fetchOHLCV(symbol, '1h')
    let historicalDataFourHour= await binance.fetchOHLCV(symbol, '4h')
    let historicalDataOneDay = await binance.fetchOHLCV(symbol, '1d')

    return historicalDataOneHour, historicalDataFourHour, historicalDataOneDay
        
    } catch (error) {
        console.log(`could not get historical data of ${symbol}`);
    }

}


async function getAllMarket(exchange) {
    try {
        let allmarket = await exchange.fetchMarkets()

        let futuresMarket = []
    
        for (market of allmarket) {
            if (market.quote == 'USDT' && market.info.contractType == 'PERPETUAL' && market.active ) {
                futuresMarket.push(market.id)
            }
        }
    
        return futuresMarket
    } catch (error) {
        console.log(`could not get all markets`);
    }
    // let allMarket = await 
   
}








module.exports = {
    getHistoricalData,
    getAllMarket
}