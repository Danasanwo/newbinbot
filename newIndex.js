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


let counter = 0;



async function mainBot() {
    try {


        counter++;


        let allPositions = await binance.fetchPositions()
        let getUSDTBalance = await (await binance.fetchBalance()).info.availableBalance
       

        
    

        for (pos of allPositions) {
            newRiskManager.setStopLossTakeProfit(pos, binance, 0, getUSDTBalance)
        }



        if (counter == 20 ) {


        counter = 0;
        


        let symBolData = await combineAlgo.compileAlgo(binance)

        console.log(symBolData);

        
    

        // change api source 

        let combined4hRSIArray = symBolData.map(a => a[3]).filter(element => typeof element === 'number')
        let combined4hRSIValue = combined4hRSIArray.length > 0 ? ((combined4hRSIArray.reduce((acc, curr) => acc + curr, 0))/combined4hRSIArray.length):0
    

        let combined1dRSIArray = symBolData.map(a => a[4]).filter(element => typeof element === 'number')
        let combined1dRSIValue = combined1dRSIArray.length > 0 ? ((combined1dRSIArray.reduce((acc, curr) => acc + curr, 0))/combined1dRSIArray.length):0

        let rsi4hUpperlimit = combined4hRSIValue && combined4hRSIValue + 18 > 74 ? combined4hRSIValue + 18 : 73
        let rsi4hLowerLimit = combined4hRSIValue && combined4hRSIValue - 15 < 27 ? combined4hRSIValue - 15 : 25

        let rsi1dUpperLimit = combined1dRSIValue && combined1dRSIValue + 15 > 71 ? combined1dRSIValue + 15 : 71
        let rsi1dLowerLimit  = combined4hRSIValue && combined1dRSIValue - 12 < 28 ? combined1dRSIValue - 12: 27

        


        // Lower RSIs 

        let symbolData4hRSI = symBolData.sort((a, b) => Math.abs(b[3]) - Math.abs(a[3])).filter((a) => a[3] > rsi4hUpperlimit);

        let symbolData4hRSI20 = symBolData.sort((a, b) => Math.abs(a[3]) - Math.abs(b[3])).filter((a) => a[3] < rsi4hLowerLimit);

        let symbolData1dRSI = symBolData.sort((a, b) => Math.abs(b[4]) - Math.abs(a[4])).filter((a) => a[4] > rsi1dUpperLimit);

        let symbolData1dRSI20 = symBolData.sort((a, b) => Math.abs(a[4]) - Math.abs(b[4])).filter((a) => a[3] < rsi1dLowerLimit);


        // higher RSIS

        let symbolData4hRSI80 = symBolData.sort((a, b) => Math.abs(b[3]) - Math.abs(a[3])).filter((a) => a[3] > (rsi4hUpperlimit + 7));

        let symbolData4hRSI8020 = symBolData.sort((a, b) => Math.abs(a[3]) - Math.abs(b[3])).filter((a) =>  a[3] < (rsi4hLowerLimit - 5));

        let symbolData1dRSI80 = symBolData.sort((a, b) => Math.abs(b[4]) - Math.abs(a[4])).filter((a) => a[4] > (rsi1dUpperLimit + 5))

        let symbolData1dRSI8020 = symBolData.sort((a, b) => Math.abs(a[3]) - Math.abs(b[3])).filter((a) =>  a[3] < (rsi1dLowerLimit - 5));

    
        // console.log("let's go for bot 1");

        let positionSymbols = allPositions.map(obj => obj.info.symbol)
        let uniquePositionSymbols = [...new Set(positionSymbols) ]
        let numberOfAvailableOrders = (combined4hRSIValue && combined4hRSIArray < 27) ? 30 : 8 - uniquePositionSymbols.length 
        let numberOfAvailableOrders80 = 15 - uniquePositionSymbols.length




        if (numberOfAvailableOrders80 > 0) {
            try {

                console.log('rsi80s');


                let rsi4h80OrderableSymbols = await placeOrder.removePositionsFromSymbolData(symbolData4hRSI80, uniquePositionSymbols)
                // let rsi1d80OrderableSymbols =  await placeOrder.removePositionsFromSymbolData(symbolData1dRSI80, uniquePositionSymbols)
                let rsi4h8020OrderableSymbols = await placeOrder.removePositionsFromSymbolData(symbolData4hRSI8020, uniquePositionSymbols)
                // let rsi1d8020OrderableSymbols = await placeOrder.removePositionsFromSymbolData(symbolData1dRSI8020, uniquePositionSymbols)
    

                rsi4h80OrderableSymbols.slice(0, numberOfAvailableOrders80)
                // rsi1d80OrderableSymbols.slice(0, numberOfAvailableOrders80)
                rsi4h8020OrderableSymbols.slice(0, numberOfAvailableOrders80)
                // rsi1d8020OrderableSymbols.slice(0, numberOfAvailableOrders80)
                   
                await placeOrder.cancelExistingOrders(rsi4h80OrderableSymbols, binance, getUSDTBalance)
                // await placeOrder.cancelExistingOrders(rsi1d80OrderableSymbols, binance, getUSDTBalance)
                await placeOrder.cancelExistingOrders(rsi4h8020OrderableSymbols, binance, getUSDTBalance)
                // await placeOrder.cancelExistingOrders(rsi1d8020OrderableSymbols, binance, getUSDTBalance)
                
            } catch (error) {
                console.log('error placing order in bot 1 - rsi 80');
            }
       

        } else console.log('positions in bot 1 for rsi 80 are filled');
        

        if (numberOfAvailableOrders > 0) {

    
            try {

                console.log('rsi70s');

                let rsi4hOrderableSymbols = await placeOrder.removePositionsFromSymbolData(symbolData4hRSI, uniquePositionSymbols)
                // let rsi1dOrderableSymbols = await placeOrder.removePositionsFromSymbolData(symbolData1dRSI, uniquePositionSymbols)

                rsi4hOrderableSymbols.slice(0, numberOfAvailableOrders)
                // rsi1dOrderableSymbols.slice(0, numberOfAvailableOrders)

                console.log(rsi4hOrderableSymbols);
                // console.log(rsi1dOrderableSymbols);

                await placeOrder.cancelExistingOrders(rsi4hOrderableSymbols, binance, getUSDTBalance)
                // await placeOrder.cancelExistingOrders(rsi1dOrderableSymbols, binance, getUSDTBalance)

            } catch (error) {
                console.log('error placing order in bot 1');
            }
       

        } else console.log('positions in bot 1 are filled');

        if ((numberOfAvailableOrders + 1) > 0) {
                
            try {

                console.log('rsi70s');

                let rsi4h20OrderableSymbols = await placeOrder.removePositionsFromSymbolData(symbolData4hRSI20, uniquePositionSymbols)
                // let rsi1d20OrderableSymbols = await placeOrder.removePositionsFromSymbolData(symbolData1dRSI20, uniquePositionSymbols)

                rsi4h20OrderableSymbols.slice(0, numberOfAvailableOrders)
                // rsi1d20OrderableSymbols.slice(0, numberOfAvailableOrders)

                await placeOrder.cancelExistingOrders(rsi4h20OrderableSymbols, binance, getUSDTBalance)
                // await placeOrder.cancelExistingOrders(rsi1d20OrderableSymbols, binance, getUSDTBalance)

            } catch (error) {
                console.log('error placing order in bot 1');
            }

        } else console.log('positions in bot 1 buy are filled');
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

setInterval(mainBot, 180000)



  



    
