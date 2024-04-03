const ccxt = require('ccxt')
require('dotenv').config()
const { config } = require('dotenv')
const riskManager = require('./riskManagement')
const candleStickAnalyser = require('./candleStickAnalysis')
const technicalAnalyser = require('./technicalIndicators')
const fibb = require('./fibonnaci')
const techApi = require('./techApi')
const prioritizer = require('./prioritizer')
const getHistoricalData = require('./getHistoricalData')
const random = require('./random');
const combineAlgo = require('./compileAlgo')
const placeOrder = require('./placeOrders')


async function mainBot() {
    try {


    let allPositions = await binance.fetchPositions()
    let getAllMarket = await getHistoricalData.getAllMarket(binance)
    let getUSDTBalance = await (await binance.fetchBalance()).info.availableBalance
    let positionSymbols = allPositions.map(obj => obj.info.symbol)
    let uniquePositionSymbols = [...new Set(positionSymbols) ]
    let numberOfAvailableOrders = 5 - uniquePositionSymbols.length 
    
  

 
    for (pos of allPositions) {
        riskManager.setStopLossTakeProfit(pos, binance)
    }
   
 
    if (numberOfAvailableOrders) {
        let symBolData = await combineAlgo.compileAlgo(binance)
        let orderableSymbols =await placeOrder.removePositionsFromSymbolData(symBolData, uniquePositionSymbols).slice(0, numberOfAvailableOrders)
        let continueOrder = await placeOrder.cancelExistingOrders(orderableSymbols, binance, getUSDTBalance)

    }









    } catch (error) {
        console.log(error);
    }
}

const binance = new ccxt.binanceusdm({
    apiKey: process.env.BINANCE_API_KEY,
    secret: process.env.BINANCE_SECRET_KEY
})



setInterval(mainBot, 1200000)

