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
const orderSystem = require('./botTwoOrderSystem')


async function mainBot() {
    try {



        console.log("let's go for bot 1");


        let allPositions = await binance.fetchPositions()
        let getUSDTBalance = await (await binance.fetchBalance()).info.availableBalance
        let positionSymbols = allPositions.map(obj => obj.info.symbol)
        let uniquePositionSymbols = [...new Set(positionSymbols) ]
        let numberOfAvailableOrders = 7 - uniquePositionSymbols.length 

    
        for (pos of allPositions) {
            riskManager.setStopLossTakeProfit(pos, binance)
        }

        if (numberOfAvailableOrders > 0) {

            let symBolData = await combineAlgo.compileAlgo(secondBinance)

            console.log(symBolData);
       
            try {
                let orderableSymbols =await placeOrder.removePositionsFromSymbolData(symBolData, uniquePositionSymbols).slice(0, numberOfAvailableOrders)
                let continueOrder = await placeOrder.cancelExistingOrders(orderableSymbols, binance, getUSDTBalance)
            } catch (error) {
                console.log('error placing order in bot 1');
            }
       

        } else console.log('positions in bot 1 are filled');

        console.log("let's go for bot 2");

        let allPositionsBotTwo = await secondBinance.fetchPositions()


        for (pos of allPositionsBotTwo) {
            orderSystem.setStopLossTakeProfit(pos, secondBinance)
        }







  
    

    } catch (error) {
        console.log(error);
    }
}

const binance = new ccxt.binanceusdm({
    apiKey: process.env.BINANCE_API_KEY,
    secret: process.env.BINANCE_SECRET_KEY
})

const secondBinance = new ccxt.binanceusdm({
    apiKey: process.env.BINANCE_TWO_API_KEY,
    secret: process.env.BINANCE_TWO_SECRET_KEY
})


mainBot()

setInterval(mainBot, 900000)



      // if (numberOfAvailableOrdersBotTwo > 0) {

        //     try {
        //         let orderableSymbolsinBotTwo = await placeOrder.removePositionsFromSymbolData(symBolData, uniquePositionSymbolsBotTwo).slice(0, numberOfAvailableOrdersBotTwo)
        //         let continueOrderinBotTwo = await orderSystem.cancelExistingOrders(orderableSymbolsinBotTwo, secondBinance, getUSDTBalanceBotTwo)
        //     } catch (error) {
        //         console.log('error placing order in bot 2');
        //     }

        // } else console.log('positions in bot 2 are filled');



        // for (pos of allPositionsBotTwo) {
        //     orderSystem.setStopLossTakeProfit(pos, secondBinance)
        // }

          // console.log("let's go for bot 2");

        // let allPositionsBotTwo = await secondBinance.fetchPositions()
        // let getUSDTBalanceBotTwo = await (await secondBinance.fetchBalance()).info.availableBalance
        // let positionSymbolsBotTwo = allPositionsBotTwo.map(obj => obj.info.symbol)
        // let uniquePositionSymbolsBotTwo = [...new Set(positionSymbolsBotTwo) ]
        // let numberOfAvailableOrdersBotTwo = 8 - uniquePositionSymbolsBotTwo.length 