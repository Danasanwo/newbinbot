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

async function mainBot() {

    //check current positions and status


    let allPositions = await binance.fetchPositions()

    console.log(allPositions);





    // check total number of positions 

    // if less than maximum number of positions  - create new orders -
    //                   |
    //                   v
        // get all market and their symbols

       

       let getAllMarket = await getHistoricalData.getAllMarket(binance)


        let symBolData = []
    

        for (symbol of getAllMarket) {


            let historicalDataOneHour= await binance.fetchOHLCV(symbol, '1h')
            let historicalDataFourHour= await binance.fetchOHLCV(symbol, '4h')
            let historicalDataOneDay = await binance.fetchOHLCV(symbol, '1d')

             // Using random.js as I created new file instead of candlestickAnalysis.js

            const oneHourCandlesticks =await random.analyseCandlesticks(historicalDataOneHour)
            const fourHourCandlesticks = await random.analyseCandlesticks(historicalDataFourHour)
            const oneDayCandlesticks = await random.analyseCandlesticks(historicalDataOneDay)



            const oneHourIndicators =  await techApi.indicate(historicalDataOneHour)
            const fourHourIndicators =  await techApi.indicate(historicalDataFourHour)
            const oneDayIndicators =  await techApi.indicate(historicalDataOneDay)

        
            const fibonnaci = await fibb.analyseFibonacci(historicalDataOneDay)

            let prioritizeOneHour = await prioritizer.prioritizeMarkets(oneHourCandlesticks,oneHourIndicators, historicalDataOneHour)
            let prioritizeFourHours = await prioritizer.prioritizeMarkets(fourHourCandlesticks,fourHourIndicators, historicalDataFourHour)
            let prioritizeOneDay = await prioritizer.prioritizeMarkets(oneDayCandlesticks,oneDayIndicators, historicalDataOneDay) 

            let combinePri = await prioritizer.combineTimePeriod(prioritizeOneHour, prioritizeFourHours,prioritizeOneDay )

            symBolData.push([symbol, combinePri])
        }



       symBolData.sort((a,b) => Math.abs(b[1]) - Math.abs(a[1]))

       console.table(symBolData);


}










const binance = new ccxt.binanceusdm({
    apiKey: process.env.BINANCE_API_KEY,
    secret: process.env.BINANCE_SECRET_KEY
})

// binance.setSandboxMode(true)




mainBot().catch(console.error)