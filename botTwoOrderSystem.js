async function setStopLossTakeProfit(pos, binance) {
    try {
        // Fetch open orders for the position's symbol
        let getPositionOrders = await binance.fetchOpenOrders(pos.info.symbol);


        let side = pos.side === 'short' || pos.side === 'sell' ? 'buy' : 'sell';
        let stopLossPrice = await pos.side === 'short' || pos.side === 'sell' ? (pos.entryPrice + (0.3 * pos.entryPrice )): (pos.entryPrice - (0.3 * pos.entryPrice ))
        let takeProfitPrice = await pos.side === 'short' || pos.side === 'sell' ? (pos.entryPrice - (0.15 * pos.entryPrice )): (pos.entryPrice + (0.15 * pos.entryPrice ))
        let stopLossThreshold = -(6 * pos.initialMargin);
        let takeProfitThreshold = 3 * pos.initialMargin;

        async function setSLTPorders() {
            // Check if stop loss or take profit conditions are met
            if (pos.unrealizedPnl <= stopLossThreshold || pos.unrealizedPnl >= takeProfitThreshold) {
                // Create trailing stop order
                await binance.createTrailingPercentOrder(pos.info.symbol, 'trailing_stop', side, pos.contracts, undefined, 5)

                console.log(`stop loss for ${pos.info.symbol}`);
            } else {
                await binance.createTrailingPercentOrder(pos.info.symbol, 'trailing_stop', side, pos.contracts, undefined, 5, takeProfitPrice);
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




async function orderSymbol(sym, side, binance, price, getUSDTBalance) {
    try {
        let trailingStopPercentage = 0.2
        let leverage =  await binance.fetchLeverages(sym)
        let baseOrderAmount = ((0.02 * getUSDTBalance) * 20)/ price

        let additionalParams = await side == 'buy' ? 'LONG': 'SHORT'

        console.log(baseOrderAmount);
    
        await binance.createTrailingPercentOrder(sym, 'trailing_stop',side, baseOrderAmount, undefined, trailingStopPercentage, undefined, undefined)

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
             let marketSide = await market[1] >= 0 ? 'sell': 'buy'
             let currentPrice = await market[2]
             let openOrders = await binance.fetchOpenOrders(marketSymbol)
             
     
             if (openOrders.length == 0) {
               await orderSymbol(marketSymbol, marketSide, binance, currentPrice, getUSDTBalance)
             }
         
        }
        
    } catch (error) {
        console.log(`could not check for existing item`);
    }




}

module.exports = {
    setStopLossTakeProfit,
    cancelExistingOrders,
    orderSymbol
}
