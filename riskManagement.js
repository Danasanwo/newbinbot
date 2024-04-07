async function setStopLossTakeProfit(pos, binance) {
    try {
        // Fetch open orders for the position's symbol
        let getPositionOrders = await binance.fetchOpenOrders(pos.info.symbol);

        let side = pos.side === 'short' || pos.side === 'sell' ? 'buy' : 'sell';
        let stopLossPrice = await pos.side === 'short' || pos.side === 'sell' ? (pos.entryPrice + (0.15 * pos.entryPrice )): (pos.entryPrice - (0.15 * pos.entryPrice ))
        let takeProfitPrice = await pos.side === 'short' || pos.side === 'sell' ? (pos.entryPrice - (0.025 * pos.entryPrice )): (pos.entryPrice + (0.025 * pos.entryPrice ))
        let stopLossThreshold = -(4 * pos.initialMargin);
        let takeProfitThreshold = 0.5 * pos.initialMargin;

        async function setSLTPorders() {
            // Check if stop loss or take profit conditions are met
            if (pos.unrealizedPnl <= stopLossThreshold || pos.unrealizedPnl >= takeProfitThreshold) {
                // Create trailing stop order
                await binance.createTrailingPercentOrder(pos.info.symbol, 'trailing_stop', side, pos.contracts, undefined, pos.unrealizedPnl <= stopLossThreshold ? 5 : 0.75);

                console.log(`stop loss for ${pos.info.symbol}`);
            } else {
                await binance.createTrailingPercentOrder(pos.info.symbol, 'trailing_stop', side, pos.contracts, undefined, 0.75, takeProfitPrice);
            }   console.log(`take profit for ${pos.info.symbol}`);
        }


        // Check if there are no open orders for the position
        if (getPositionOrders.length === 0) setSLTPorders()

        if ( getPositionOrders.length === 1) {

            console.log(getPositionOrders[0].triggerPrice, pos.entryPrice, stopLossPrice, side);



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



module.exports = {
    setStopLossTakeProfit,
}
