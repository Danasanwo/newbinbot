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
const newOrderSystem = require('./newOrderSystem')
const newRiskManager = require('./redoRiskManagement')


async function mainBot() {
    try {

        let symBolData = await combineAlgo.compileAlgo(binance)

        let symbolData4hRSI = symBolData.sort((a, b) => Math.abs(b[3]) - Math.abs(a[3])).filter((a) => a[3] > 73 || a[3] < 25 );

        let symbolData1dRSI = symBolData.sort((a, b) => Math.abs(b[4]) - Math.abs(a[4])).filter((a) => a[4] > 71 || a[3] < 25 );

        let symbolData4hRSI80 = symBolData.sort((a, b) => Math.abs(b[3]) - Math.abs(a[3])).filter((a) => a[3] > 81 || a[3] < 19 );

        let symbolData1dRSI80 = symBolData.sort((a, b) => Math.abs(b[4]) - Math.abs(a[4])).filter((a) => a[4] > 81 || a[3] < 19 );





        console.log("let's go for bot 1");


        let allPositions = await binance.fetchPositions()
        let getUSDTBalance = await (await binance.fetchBalance()).info.availableBalance
        let positionSymbols = allPositions.map(obj => obj.info.symbol)
        let uniquePositionSymbols = [...new Set(positionSymbols) ]
        let numberOfAvailableOrders = 7 - uniquePositionSymbols.length 
        let numberOfAvailableOrders80 = 50 - uniquePositionSymbols.length
    


        for (pos of allPositions) {
            newRiskManager.setStopLossTakeProfit(pos, binance, symBolData)
        }

        if (numberOfAvailableOrders80 > 0) {
            try {
                let rsi4h80OrderableSymbols = await placeOrder.removePositionsFromSymbolData(symbolData4hRSI80, uniquePositionSymbols)
                let rsi1d80OrderableSymbols =  await placeOrder.removePositionsFromSymbolData(symbolData1dRSI80, uniquePositionSymbols)
    
                   
                await placeOrder.cancelExistingOrders(rsi4h80OrderableSymbols, binance, getUSDTBalance)
                await placeOrder.cancelExistingOrders(rsi1d80OrderableSymbols, binance, getUSDTBalance)
                
            } catch (error) {
                console.log('error placing order in bot 1 - rsi 80');
            }
       

        } else console.log('positions in bot 1 for rsi 80 are filled');

        if (numberOfAvailableOrders > 0) {

    
            try {
                let rsi4hOrderableSymbols = await placeOrder.removePositionsFromSymbolData(symbolData4hRSI, uniquePositionSymbols)
                let rsi1dOrderableSymbols = await placeOrder.removePositionsFromSymbolData(symbolData1dRSI, uniquePositionSymbols)

                
                await placeOrder.cancelExistingOrders(rsi4hOrderableSymbols, binance, getUSDTBalance)
                await placeOrder.cancelExistingOrders(rsi1dOrderableSymbols, binance, getUSDTBalance)

            } catch (error) {
                console.log('error placing order in bot 1');
            }
       

        } else console.log('positions in bot 1 are filled');



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

setInterval(mainBot, 1200000)




        // console.log("let's go for bot 2");

        // let allPositionsBotTwo = await secondBinance.fetchPositions()
        // let getUSDTBalanceBotTwo = await (await secondBinance.fetchBalance()).info.availableBalance
        // let positionSymbolsBotTwo = allPositionsBotTwo.map(obj => obj.info.symbol)
        // let uniquePositionSymbolsBotTwo = [...new Set(positionSymbolsBotTwo) ]
        // let numberOfAvailableOrdersBotTwo = 8 - uniquePositionSymbolsBotTwo.length 


        // for (pos of allPositionsBotTwo) {
        //     orderSystem.setStopLossTakeProfit(pos, secondBinance)
        // }

        // if (numberOfAvailableOrdersBotTwo > 0) {

        //     try {
        //         let orderableSymbolsinBotTwo = await placeOrder.removePositionsFromSymbolData(symBolData, uniquePositionSymbolsBotTwo).slice(0, numberOfAvailableOrdersBotTwo)
        //         let continueOrderinBotTwo = await orderSystem.cancelExistingOrders(orderableSymbolsinBotTwo, secondBinance, getUSDTBalanceBotTwo)
        //     } catch (error) {
        //         console.log('error placing order in bot 2');
        //     }

        // } else console.log('positions in bot 2 are filled');

        // let continueOrder =

                // try {

            //     let orderableSymbols =await placeOrder.removePositionsFromSymbolData(symBolData, uniquePositionSymbols).slice(0, numberOfAvailableOrders)
                
            // } catch (error) {
            //     console.log('error placing order in bot 1');
            // }

    

                // let orderableSymbols = []
                // let compileOrderableSymbols = await placeOrder.removePositionsFromSymbolData(symBolData, uniquePositionSymbols).slice(0, numberOfAvailableOrders)
     



  



    
