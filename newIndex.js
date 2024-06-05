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

        let combined4hRSIArray = symBolData.map(a => a[3]).filter(element => typeof element === 'number')
        let combined4hRSIValue = combined4hRSIArray.length > 0 ? ((combined4hRSIArray.reduce((acc, curr) => acc + curr, 0))/combined4hRSIArray.length):0
    

        let combined1dRSIArray = symBolData.map(a => a[4]).filter(element => typeof element === 'number')
        let combined1dRSIValue = combined1dRSIArray.length > 0 ? ((combined1dRSIArray.reduce((acc, curr) => acc + curr, 0))/combined1dRSIArray.length):0

        let rsi4hUpperlimit = combined4hRSIValue && combined4hRSIValue + 25 > 75 ? combined4hRSIValue + 25 : 75
        let rsi4hLowerLimit = combined4hRSIValue && combined4hRSIValue - 20 < 23 ? combined4hRSIValue - 20 : 23

        let rsi1dUpperLimit = combined1dRSIValue && combined1dRSIValue + 23 > 75 ? combined1dRSIValue + 23 : 75
        let rsi1dLowerLimit  = combined4hRSIValue && combined1dRSIValue - 17 < 25 ? combined1dRSIValue - 17: 25

        console.log(rsi4hUpperlimit,rsi4hLowerLimit, rsi1dUpperLimit, rsi1dLowerLimit);


        // Lower RSIs 

        let symbolData4hRSI = symBolData.sort((a, b) => Math.abs(b[3]) - Math.abs(a[3])).filter((a) => a[3] > rsi4hUpperlimit);

        let symbolData4hRSI20 = symBolData.sort((a, b) => Math.abs(a[3]) - Math.abs(b[3])).filter((a) => a[3] < rsi4hLowerLimit);

        let symbolData1dRSI = symBolData.sort((a, b) => Math.abs(b[4]) - Math.abs(a[4])).filter((a) => a[4] > rsi1dUpperLimit);

        let symbolData1dRSI20 = symBolData.sort((a, b) => Math.abs(a[4]) - Math.abs(b[4])).filter((a) => a[3] < rsi1dLowerLimit);


        // higher RSIS

        let symbolData4hRSI80 = symBolData.sort((a, b) => Math.abs(b[3]) - Math.abs(a[3])).filter((a) => a[3] > (rsi4hUpperlimit + 5));

        let symbolData4hRSI8020 = symBolData.sort((a, b) => Math.abs(a[3]) - Math.abs(b[3])).filter((a) =>  a[3] < (rsi4hLowerLimit - 5));

        let symbolData1dRSI80 = symBolData.sort((a, b) => Math.abs(b[4]) - Math.abs(a[4])).filter((a) => a[4] > (rsi1dUpperLimit + 5))

        let symbolData1dRSI8020 = symBolData.sort((a, b) => Math.abs(a[3]) - Math.abs(b[3])).filter((a) =>  a[3] < (rsi1dLowerLimit - 5));

    
        console.log("let's go for bot 1");


        let allPositions = await binance.fetchPositions()
        let getUSDTBalance = await (await binance.fetchBalance()).info.availableBalance
        let positionSymbols = allPositions.map(obj => obj.info.symbol)
        let uniquePositionSymbols = [...new Set(positionSymbols) ]
        let numberOfAvailableOrders = 7 - uniquePositionSymbols.length 
        let numberOfAvailableOrders80 = 15 - uniquePositionSymbols.length
    


        for (pos of allPositions) {
            newRiskManager.setStopLossTakeProfit(pos, binance, symBolData)
        }

        if (numberOfAvailableOrders80 > 0) {
            try {

                console.log('rsi80s');

                let rsi4h80OrderableSymbols = await placeOrder.removePositionsFromSymbolData(symbolData4hRSI80, uniquePositionSymbols)
                let rsi1d80OrderableSymbols =  await placeOrder.removePositionsFromSymbolData(symbolData1dRSI80, uniquePositionSymbols)
                let rsi4h8020OrderableSymbols = await placeOrder.removePositionsFromSymbolData(symbolData4hRSI8020, uniquePositionSymbols)
                let rsi1d8020OrderableSymbols = await placeOrder.removePositionsFromSymbolData(symbolData1dRSI8020, uniquePositionSymbols)
    
                rsi4h80OrderableSymbols.slice(0, numberOfAvailableOrders80)
                rsi1d80OrderableSymbols.slice(0, numberOfAvailableOrders80)
                rsi4h8020OrderableSymbols.slice(0, numberOfAvailableOrders80)
                rsi1d8020OrderableSymbols.slice(0, numberOfAvailableOrders80)

                   
                await placeOrder.cancelExistingOrders(rsi4h80OrderableSymbols, binance, getUSDTBalance)
                await placeOrder.cancelExistingOrders(rsi1d80OrderableSymbols, binance, getUSDTBalance)
                await placeOrder.cancelExistingOrders(rsi4h8020OrderableSymbols, binance, getUSDTBalance)
                await placeOrder.cancelExistingOrders(rsi1d8020OrderableSymbols, binance, getUSDTBalance)
                
            } catch (error) {
                console.log('error placing order in bot 1 - rsi 80');
            }
       

        } else console.log('positions in bot 1 for rsi 80 are filled');
        

        if (numberOfAvailableOrders > 0) {

    
            try {

                console.log('rsi70s');
                let rsi4hOrderableSymbols = await placeOrder.removePositionsFromSymbolData(symbolData4hRSI, uniquePositionSymbols)
                let rsi1dOrderableSymbols = await placeOrder.removePositionsFromSymbolData(symbolData1dRSI, uniquePositionSymbols)

                rsi4hOrderableSymbols.slice(0, numberOfAvailableOrders)
                rsi1dOrderableSymbols.slice(0, numberOfAvailableOrders)

                await placeOrder.cancelExistingOrders(rsi4hOrderableSymbols, binance, getUSDTBalance)
                await placeOrder.cancelExistingOrders(rsi1dOrderableSymbols, binance, getUSDTBalance)

            } catch (error) {
                console.log('error placing order in bot 1');
            }
       

        } else console.log('positions in bot 1 are filled');

        if ((numberOfAvailableOrders + 3) > 0) {
                
            try {

                console.log('rsi70s');

                let rsi4h20OrderableSymbols = await placeOrder.removePositionsFromSymbolData(symbolData4hRSI20, uniquePositionSymbols)
                let rsi1d20OrderableSymbols = await placeOrder.removePositionsFromSymbolData(symbolData1dRSI20, uniquePositionSymbols)

                rsi4h20OrderableSymbols.slice(0, numberOfAvailableOrders)
                rsi1d20OrderableSymbols.slice(0, numberOfAvailableOrders)

                await placeOrder.cancelExistingOrders(rsi4h20OrderableSymbols, binance, getUSDTBalance)
                await placeOrder.cancelExistingOrders(rsi1d20OrderableSymbols, binance, getUSDTBalance)

            } catch (error) {
                console.log('error placing order in bot 1');
            }

        }else console.log('positions in bot 1 buy are filled');



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


binance

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
     



  



    
