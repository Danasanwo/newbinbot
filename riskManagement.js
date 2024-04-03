// async function setStopLossTakeProfit(pos, binance) {

//     let getPositionOrders = await binance.fetchOpenOrders(pos.info.symbol)

//     if (getPositionOrders.length == 0) {
    
               
//         if (pos.side == 'short' || pos.side == 'sell')  {
//             //set stop loss
//             if (pos.unrealizedPnl <= (-(3 *pos.initialMargin))) {
//                 await binance.createTrailingPercentOrder(pos.info.symbol, 'trailing_stop','buy', pos.contracts,undefined, 5)
//             }
//             // takeProfit 
//             if (pos.unrealizedPnl >= (0.5 * pos.initialMargin)) {
//                 await binance.createTrailingPercentOrder(pos.info.symbol, 'trailing_stop','buy', pos.contracts,undefined, 2)
//             }
//         }

//         if (pos.side == 'long'|| pos.side == 'buy') {
//               //set stop loss
//               if (pos.unrealizedPnl <= (-(3 *pos.initialMargin))) {
//                 await binance.createTrailingPercentOrder(pos.info.symbol, 'trailing_stop','sell', pos.contracts,undefined, 5)
//              }
//               // takeProfit 
//               if (pos.unrealizedPnl >= (0.5 * pos.initialMargin)) {
//                 await binance.createTrailingPercentOrder(pos.info.symbol, 'trailing_stop','sell', pos.contracts,undefined, 2)
//              }
//         }
//     }   
// }

async function setStopLossTakeProfit(pos, binance) {
    try {
        // Fetch open orders for the position's symbol
        let getPositionOrders = await binance.fetchOpenOrders(pos.info.symbol);

        // Check if there are no open orders for the position
        if (getPositionOrders.length === 0) {
            let side = pos.side === 'short' || pos.side === 'sell' ? 'buy' : 'sell';

            // Calculate stop loss and take profit thresholds
            let stopLossThreshold = -(3 * pos.initialMargin);
            let takeProfitThreshold = 0.5 * pos.initialMargin;

            // Check if stop loss or take profit conditions are met
            if (pos.unrealizedPnl <= stopLossThreshold || pos.unrealizedPnl >= takeProfitThreshold) {
                // Create trailing stop order
                await binance.createTrailingPercentOrder(pos.info.symbol, 'trailing_stop', side, pos.contracts, undefined, pos.unrealizedPnl <= stopLossThreshold ? 5 : 2);
            }
        }
    } catch (error) {
        console.error("An error occurred in setStopLossTakeProfit:", error);
    }
}

async function getPositionsData() {
    
}


module.exports = {
    setStopLossTakeProfit,
    getPositionsData
}
