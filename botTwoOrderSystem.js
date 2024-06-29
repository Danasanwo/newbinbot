async function setStopLossTakeProfit(pos, binance) {
    try {
        // Fetch open orders for the position's symbol
        let getPositionOrders = await binance.fetchOpenOrders(pos.info.symbol);


        let side = pos.side === 'short' || pos.side === 'sell' ? 'buy' : 'sell';
        let stopLossPrice = await pos.side === 'short' || pos.side === 'sell' ? (pos.entryPrice + (0.3 * pos.entryPrice )): (pos.entryPrice - (0.3 * pos.entryPrice ))
        let takeProfitPrice = await pos.side === 'short' || pos.side === 'sell' ? (pos.entryPrice - (0.15 * pos.entryPrice )): (pos.entryPrice + (0.05 * pos.entryPrice ))
        let stopLossThreshold = -(6 * pos.initialMargin);
        let takeProfitThreshold = 1 * pos.initialMargin;

        async function setSLTPorders() {
            // Check if stop loss or take profit conditions are met
            if (pos.unrealizedPnl <= stopLossThreshold || pos.unrealizedPnl >= takeProfitThreshold) {
                // Create trailing stop order
                await binance.createTrailingPercentOrder(pos.info.symbol, 'trailing_stop', side, pos.contracts, undefined, 5)

                console.log(`stop loss for ${pos.info.symbol}`);
            } else {
                await binance.createTrailingPercentOrder(pos.info.symbol, 'trailing_stop', side, pos.contracts, undefined, 4, takeProfitPrice);
            }   console.log(`take profit for ${pos.info.symbol}`);
        }


        // Check if there are no open orders for the position
        if (getPositionOrders.length === 0) setSLTPorders()

        if ( getPositionOrders.length === 1) {

            console.log(getPositionOrders[0]);


            if (pos.unrealizedPnl <= stopLossThreshold) {
               if (side == 'sell') {
                    if (getPositionOrders[0].triggerPrice > stopLossPrice) {
                        await binance.cancelOrder(getPositionOrders[0].id, pos.info.symbol);
                        setSLTPorders()
                    }
               }
               if (side ==='buy') {
                if (getPositionOrders[0].triggerPrice < stopLossPrice) {
                    await binance.cancelOrder(getPositionOrders[0].id, pos.info.symbol);
                    setSLTPorders()
                }
           }

            }

       
        }

    } catch (error) {
        console.error("An error occurred in setStopLossTakeProfit:", error);
    }
}




async function orderSymbol(sym, side, binance, price, getUSDTBalance, fib) {
    try {
        let trailingStopPercentage = 1
        let leverage =  await binance.fetchLeverages(sym)
        let baseOrderAmount = ((0.005 * getUSDTBalance) * 20)/ price

        let orderPrice = (fib + price)/2


        let additionalParams = await side == 'buy' ? 'LONG': 'SHORT'
    
        await binance.createTrailingPercentOrder(sym, 'trailing_stop',side, baseOrderAmount, orderPrice , trailingStopPercentage, orderPrice )

        console.log(`${sym} ${side} order has been placed at ${price} bot 2`);

    } catch (error) {
        // console.log(`could not order ${sym} `);
        console.log(error.message);
    }

}



async function cancelExistingOrders(markets, binance, getUSDTBalance) {


    try {
        if (markets.length == 0) return false

        for (market of markets) {
             let marketSymbol =await market[0]
             let marketSide = await market[1] >= 0 ? 'buy': 'sell'
             let currentPrice = await market[2]
             let openOrders = await binance.fetchOpenOrders(marketSymbol)
             let rsi1d = await market[4]
             let rsi4h = await market[3]
             let rsi1h = await market[7]
             let yesterdayPrice = await market[8][2]
             let priceChange = Math.abs( ((currentPrice - yesterdayPrice)/yesterdayPrice) * 100)
             let perGrouped = await market[9]
             let fib = await market[10]
             

            
            function findClosestNumber(obj, num, marketSide) {

                    let values = Object.values(obj);

                    // Filter the array based on the direction
                    let filteredArr = values.filter(value => {
                    return marketSide === 'buy' ? value < num : value > num;
                    });
                
                    // Sort the filtered array based on the direction
                    filteredArr.sort((a, b) => {
                    return marketSide === 'buy' ? b - a : a - b;
                    });
                
                    // Return the first element in the sorted filtered array
                    return filteredArr.length > 0 ? filteredArr[0] : null;
                }


            if (openOrders.length == 0) {
                
                    if ((rsi1h >= 60)|| (rsi1h <= 40)) {

                        if (priceChange < 15) {

                            if (perGrouped.bull >= 3 || perGrouped.bear >= 3) {
                    
                                let fibValue = findClosestNumber(fib, currentPrice, marketSide)

                                await orderSymbol(marketSymbol, marketSide, binance, currentPrice, getUSDTBalance, fibValue)
                    
                    
                            }
                        }
                




                    } 
                }

            if (openOrders.length > 0) {

                try {
                           
                    for (const ord of openOrders) {
                        if (timeNow > (ord.lastUpdateTimestamp + 86400000) ) {
                            await binance.cancelOrder(ord.id, ord.info.symbol);
                        }

                    }
                    
                } catch (error) {
                    console.log('could not cancel');
                    
                }
             
            }
         
        }
        
    } catch (error) {
        console.log(error.message);
    }




}

module.exports = {
    setStopLossTakeProfit,
    cancelExistingOrders,
    orderSymbol
}
