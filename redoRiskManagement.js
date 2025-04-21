const placeOrder = require('./placeOrders')


async function setStopLossTakeProfit(pos, binance, symbolData, getUSDTBalance) {
    try {
        // Fetch open orders for the position's symbol

        let positionSymbol = pos.info.symbol
        let initialMargin = pos.initialMargin
        let entryPrice = pos.entryPrice
        let positionSide = pos.side
        let unrealizedPnl = pos.unrealizedPnl
        let positionContracts = pos.contracts

        let reSide = positionSide === 'short' || positionSide === 'sell' ? 'sell' : 'buy';

        let getPositionOrders = await binance.fetchOpenOrders(positionSymbol);

        if (getPositionOrders.length > 1) {
            getPositionOrders.forEach(async order => {
                await binance.cancelOrder(order.id, positionSymbol)
            })
        }


        // let getSymbolData = await placeOrder.findArrayWithElement(symbolData, positionSymbol)

        // let algorithmicComPri = getSymbolData ? getSymbolData[1] : 0
        // let currentPrice = getSymbolData ? getSymbolData[2] : 0
        // let rsi4h = getSymbolData ? getSymbolData[3] : 50
        // let rsi1d = getSymbolData ? getSymbolData[4] : 50
       


        let side = positionSide === 'short' || positionSide === 'sell' ? 'buy' : 'sell';
        // let stopLossPrice = await positionSide === 'short' || positionSide === 'sell' ? (entryPrice + (0.15 * entryPrice )): (entryPrice - (0.15 * entryPrice ))
        // let takeProfitPrice = await positionSide === 'short' || positionSide === 'sell' ? (entryPrice - (0.05 * entryPrice )): (entryPrice + (0.15 * entryPrice ))
        // let stopLossThreshold = -(3 * initialMargin);
        // let takeProfitThreshold = await positionSide === 'short' || positionSide == 'sell' ? 0.6 * initialMargin : 3 * initialMargin;



        if (unrealizedPnl <= -(0.13 * getUSDTBalance)) {

            getPositionOrders.forEach(async order => {
                await binance.cancelOrder(order.id, positionSymbol)
            })

            await binance.createTrailingPercentOrder(positionSymbol, 'trailing_stop', side, positionContracts, undefined, 5)
        }

        if (unrealizedPnl >= (1.2 * initialMargin) && getPositionOrders.length == 0) {
            await binance.createTrailingPercentOrder(positionSymbol, 'trailing_stop', side, positionContracts, undefined, 5)
        }

        if (unrealizedPnl <= -(3 * initialMargin) && getPositionOrders.length == 0) {
            await binance.createMarketOrder(positionSymbol, side, (0.5 * positionContracts))

            if (initialMargin < 0.02 * getUSDTBalance) {
                await binance.createTrailingPercentOrder(positionSymbol, 'trailing_stop', reSide, positionContracts, undefined, positionSide == 'short' || positionSide == 'sell' ? 8: 5)
            }
        }



    } catch (error) {
        console.error("An error occurred in setStopLossTakeProfit:", error);
    }
}


module.exports = {
    setStopLossTakeProfit,
}



        // async function setSLTPorders() { 

        //     // take profit 

        //     try {

        //             if (unrealizedPnl >= (4 * takeProfitThreshold)) {
        //                 await binance.createTrailingPercentOrder(positionSymbol, 'trailing_stop', side, positionContracts, undefined, 5);
        //                 console.log(`take profit for ${positionSymbol}`);
        //             } else if (unrealizedPnl >= takeProfitThreshold) {
        //                 await binance.createTrailingPercentOrder(positionSymbol, 'trailing_stop', side, positionContracts, undefined, 2);
        //                 console.log(`take profit for ${positionSymbol}`);
        //             } else  if (unrealizedPnl < takeProfitThreshold ) {
        //                 if (positionSide === 'short' || positionSide === 'sell' ) {
        //                     await binance.createTrailingPercentOrder(positionSymbol, 'trailing_stop', side, positionContracts, undefined, side == 'buy' ? 1 : 2.5, takeProfitPrice);
        //                     console.log(`take profit for ${positionSymbol}`);
        //                 }
        //             } 

                
        //     } catch (error) {
        //         console.log(`unable to place take profit orders`);
        //     }

      
        
        // }

        // async function setStopLossOrders() {
        //     // check if existing stop loss

        //     try {
        //         if (unrealizedPnl >= (0.3 * initialMargin)) {
        //             await binance.createStopLossOrder(positionSymbol, 'STOP_MARKET', side, positionContracts, entryPrice, entryPrice)
        //             console.log(`stop loss for ${positionSymbol}`);
        //         }

        //     } catch (error) {
        //         console.log(error.message);
        //     }

       
        // }

            //add more 

        // async function setAddmore() {

        //     try {
        //         if (positionSide === 'short' || positionSide === 'sell') {
        //             if (rsi1d > 80 || rsi4h > 80) {
    
        //                 if (unrealizedPnl < stopLossThreshold) {
    
        //                      console.log(rsi4h, rsi1d, positionSymbol);
    
        //                      let reSide = positionSide === 'short' || positionSide === 'sell' ? 'sell' : 'buy';
                            
        //                      await binance.createTrailingPercentOrder(positionSymbol, 'trailing_stop', reSide, (1.2 * positionContracts), undefined, 5);
        //                      console.log(`add more for ${positionSymbol}`);
        //                 }
        //             }
        //         }
    
        //         if (positionSide === 'long' || positionSide === 'buy') {
        //             if (rsi1d < 20 || rsi4h < 19) {
        //                 if (unrealizedPnl < stopLossThreshold) {

        //                     let reSide = positionSide === 'short' || positionSide === 'sell' ? 'sell' : 'buy';
                            
        //                     await binance.createTrailingPercentOrder(positionSymbol, 'trailing_stop', reSide, (1 * positionContracts), undefined, 5);
        //                     console.log(`add more for ${positionSymbol}`);
        //                 }
        //             }
        //         }
                
        //     } catch (error) {
        //         console.log(`could not place addMore`);
                
        //     }

         
        // }

        // async function setLossProfitTaker() {

        //     // let trailingPercentage = Math.abs((unrealizedPnl/initialMargin) * 5)

        //     // if ((unrealizedPnl > (0.5 * initialMargin)) || (unrealizedPnl < (- initialMargin))) {
        //     //     await binance.createTrailingPercentOrder(positionSymbol, 'trailing_stop', side, positionContracts, undefined, trailingPercentage > 5 ? 5 :trailingPercentage)
        //     // }
        // }
        

        // check existing orders 

        // if (getPositionOrders.length === 0) {
        //     // setSLTPorders()
        //     // setAddmore()
        //     // setStopLossOrders()
        //     setLossProfitTaker()
        // } 

        // if (getPositionOrders.length  == 1) {

        //     if (getPositionOrders[0].side == side) {
        //         setAddmore()
        //         setStopLossOrders()
        //     } 

        //     if (getPositionOrders[0].side != side) {

        //         setSLTPorders()
        //         setStopLossOrders()
        //     } 

        // }

        
   
        

        // if (getPositionOrders.length > 2) {
        //     for (let index = 0; index < getPositionOrders.length; index++) {

        //         await binance.cancelOrder(getPositionOrders[index].id, positionSymbol);
        //     }

        //     setSLTPorders()
        //     setAddmore()
        // }

