
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


    let getAllMarket = await getHistoricalData.getAllMarket(binance)

    let getUSDTBalance = await (await binance.fetchBalance()).info.availableBalance

    console.log(getAllMarket);



    let symBolData = []

    if (allPositions.length < 5) {

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

            const combinePri = await prioritizer.combineTimePeriod(prioritizeOneHour, prioritizeFourHours,prioritizeOneDay)

            // for (position of allPositions) {
            //     if (position.info.symbol == symbol) {

            //       riskManager.setStopLossTakeProfit(position, binance, fibonnaci, oneDayIndicators, combinePri, symbol)
            //     }
            // }

            symBolData.push([symbol, combinePri, historicalDataOneHour[historicalDataOneHour.length - 1][4]])

        }

    symBolData.sort((a,b) => Math.abs(b[1]) - Math.abs(a[1]))

    console.log();

    let orderingSymbol = []

  
    // for (topSymbol of symBolData) {


    //     let leverage = 20
    //     let currentPrice = topSymbol[2]
    //     let setLeverage = await binance.setLeverage(leverage, topSymbol[0])
    //     let trailingStopPercentage = 1.5
    //     let orderSide = topSymbol[1] >= 0 ? 'buy': 'sell'
    //     let orders = await binance.fetchOpenOrders(topSymbol[0])
    //     let baseOrderAmount = ((0.04 * getUSDTBalance) * leverage)/ currentPrice

    //     for (pos of allPositions) {
    //     //    stoplossTakeProfit 


    //         // console.log(pos);
    //         // if (pos.info.symbol == topSymbo[0]) {
    //         //     if (pos.info.side == 'buy') {
    //         //         if (currentPrice > ())
    //         //     }
    //         //     if (pos.info.side == 'sell') {

    //         //     }
    //         // }



    //     }

    //     if (orders.length > 0) {
    //         for (const order of orders) {
    //             if ((order.side == 'buy' && orderSide == 'buy' && order.stopPrice > (((100 - trailingStopPercentage)/100) * currentPrice)) ||
    //             (order.side == 'sell' && orderSide == 'sell' && order.stopPrice < (((100 - trailingStopPercentage)/100) * currentPrice)))
    //             {
    //                 await binance.cancelOrder(order.id, topSymbol[0])

    //                 if (allPositions.length > 0) {

    //                     for (position of allPositions) {
    //                         if (topSymbol[0] != position.info.symbol && !orderingSymbol.includes(topSymbol)) {

    //                             orderingSymbol.push(topSymbol)   
                              
    //                             await binance.createTrailingPercentOrder(topSymbol[0],  'trailing_stop',orderSide, baseOrderAmount, currentPrice, trailingStopPercentage)

    //                             console.log(`placed a ${orderSide} trailing stop order at ${currentPrice} for ${topSymbol[0]} `);
                            
    //                         }
    //                     } 
            
    //                 } else {
            
    //                     orderingSymbol.push(topSymbol)
            
    //                     // place orders 

    //                     await binance.createTrailingPercentOrder(topSymbol[0],  'trailing_stop',orderSide, baseOrderAmount, undefined, trailingStopPercentage)
            
    //                 }
            
    //             } else if((order.side == 'buy' && orderSide == 'buy' && order.stopPrice < (((100 - trailingStopPercentage)/100) * currentPrice)) ||
    //             (order.side == 'sell' && orderSide == 'sell' && order.stopPrice > (((100 - trailingStopPercentage)/100) * currentPrice))) {
    //                 return false
    //             } else {
    //                 if (allPositions.length > 0) {

    //                     for (position of allPositions) {
    //                         if (topSymbol[0] != position.info.symbol && !orderingSymbol.includes(topSymbol)) {
        
    //                             orderingSymbol.push(topSymbol)   
                              
    //                             await binance.createTrailingPercentOrder(topSymbol[0],  'trailing_stop',orderSide, baseOrderAmount, currentPrice, trailingStopPercentage)
        
    //                             console.log(`placed a ${orderSide} trailing stop order at ${currentPrice} for ${topSymbol[0]} `);
                            
    //                         }
    //                     } 
            
    //                 } else {
            
    //                     orderingSymbol.push(topSymbol)
            
    //                     // place orders 
        
    //                     await binance.createTrailingPercentOrder(topSymbol[0],  'trailing_stop',orderSide, baseOrderAmount, undefined, trailingStopPercentage)
            
    //                 }
    //             }
                
    //         }
    //     } else {
    //         if (allPositions.length > 0) {

    //             for (position of allPositions) {
    //                 if (topSymbol[0] != position.info.symbol && !orderingSymbol.includes(topSymbol)) {

    //                     orderingSymbol.push(topSymbol)   
                      
    //                     await binance.createTrailingPercentOrder(topSymbol[0],  'trailing_stop',orderSide, baseOrderAmount, currentPrice, trailingStopPercentage)

    //                     console.log(`placed a ${orderSide} trailing stop order at ${currentPrice} for ${topSymbol[0]} `);
                    
    //                 }
    //             } 
    
    //         } else {
    
    //             orderingSymbol.push(topSymbol)
    
    //             // place orders 

                // await binance.createTrailingPercentOrder(topSymbol[0],  'trailing_stop',orderSide, baseOrderAmount, undefined, trailingStopPercentage)
    
    //         }


            

    //     }


      
    //     if (orderingSymbol.length >= (5 - allPositions.length )) break;
    //  }


    



        
        


   }


} 










const binance = new ccxt.binanceusdm({
    apiKey: process.env.PAPER_API_KEY,
    secret: process.env.PAPER_SECRET_KEY
})

binance.setSandboxMode(true)




mainBot().catch(console.error)