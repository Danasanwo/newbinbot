const placeOrder = require('./placeOrders')


async function setStopLossTakeProfit(pos, binance, symbolData) {
    try {
        // Fetch open orders for the position's symbol

        let positionSymbol = pos.info.symbol
        let initialMargin = pos.initialMargin
        let entryPrice = pos.entryPrice
        let positionSide = pos.side
        let unrealizedPnl = pos.unrealizedPnl
        let positionContracts = pos.contracts

        let getPositionOrders = await binance.fetchOpenOrders(positionSymbol);

        let getSymbolData = await placeOrder.findArrayWithElement(symbolData, positionSymbol)

        let algorithmicComPri =getSymbolData ? getSymbolData[1] : 0
        let currentPrice = getSymbolData ? getSymbolData[2] : 0
        let rsi4h = getSymbolData ? getSymbolData[3] : 50
        let rsi1d = getSymbolData ? getSymbolData[4] : 50
       


        let side = positionSide === 'short' || positionSide === 'sell' ? 'buy' : 'sell';
        let stopLossPrice = await positionSide === 'short' || positionSide === 'sell' ? (entryPrice + (0.15 * entryPrice )): (entryPrice - (0.15 * entryPrice ))
        let takeProfitPrice = await positionSide === 'short' || positionSide === 'sell' ? (entryPrice - (0.05 * entryPrice )): (entryPrice + (0.05 * entryPrice ))
        let stopLossThreshold = -(3 * initialMargin);
        let takeProfitThreshold = 1 * initialMargin;


        async function setSLTPorders() { 
            // take profit 

            if (unrealizedPnl >= (4 * takeProfitThreshold)) {
                await binance.createTrailingPercentOrder(positionSymbol, 'trailing_stop', side, positionContracts, undefined, 7);
                console.log(`take profit for ${positionSymbol}`);
            } else if (unrealizedPnl >= takeProfitThreshold) {
                await binance.createTrailingPercentOrder(positionSymbol, 'trailing_stop', side, positionContracts, undefined, 5);
                console.log(`take profit for ${positionSymbol}`);
            } else  if (unrealizedPnl < takeProfitThreshold ) {
                await binance.createTrailingPercentOrder(positionSymbol, 'trailing_stop', side, positionContracts, undefined, 5, takeProfitPrice);
                console.log(`take profit for ${positionSymbol}`);
            } 
        
        }

            //add more 

        async function setAddmore() {

            if (positionSide === 'short' || positionSide === 'sell') {
                if (rsi1d > 80 || rsi4h > 80) {
                    if (unrealizedPnl < stopLossThreshold) {
                         await binance.createTrailingPercentOrder(positionSymbol, 'trailing_stop', positionSide, (1.75 * positionContracts), undefined, 3);
                         console.log(`add more for ${positionSymbol}`);
                    }
                }
            }

            if (positionSide === 'long' || positionSide === 'buy') {
                if (rsi1d < 15 || rsi4h < 15) {
                    if (unrealizedPnl < stopLossThreshold) {
                         await binance.createTrailingPercentOrder(positionSymbol, 'trailing_stop', positionSide, (1.75 * positionContracts), undefined, 3);
                         console.log(`add more for ${positionSymbol}`);
                    }
                }
            }
        }

        

        // check existing orders 

        if (getPositionOrders.length === 0) {
            setSLTPorders()
            setAddmore()
        } 

        if (getPositionOrders.length  == 1) {

            if (getPositionOrders[0].side == side) {
                setAddmore()
            } 

            if (getPositionOrders[0].side != side) {
                setSLTPorders()
            } 

        }

        if (getPositionOrders.length > 2) {
            for (let index = 0; index < array.length; index++) {
                await binance.cancelOrder(getPositionOrders[index].id, positionSymbol);
            }
            
            setSLTPorders()
            setAddmore()
        }







    } catch (error) {
        console.error("An error occurred in setStopLossTakeProfit:", error);
    }
}


module.exports = {
    setStopLossTakeProfit,
}