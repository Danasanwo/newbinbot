const ccxt = require('ccxt')

async function getHistoricalData(symbol) {
     
    let historicalDataOneHour= await binance.fetchOHLCV(symbol, '1h')
    let historicalDataFourHour= await binance.fetchOHLCV(symbol, '4h')
    let historicalDataOneDay = await binance.fetchOHLCV(symbol, '1d')

    return historicalDataOneHour, historicalDataFourHour, historicalDataOneDay
}


async function getAllMarket(exchange) {
    // let allMarket = await 
    let allmarket = await exchange.fetchMarkets()

    let futuresMarket = []

    for (market of allmarket) {
        if (market.quote == 'USDT' && market.info.contractType == 'PERPETUAL' && market.active ) {
            futuresMarket.push(market.id)
        }
    }

    return futuresMarket
}








module.exports = {
    getHistoricalData,
    getAllMarket
}