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
        let takeProfitPrice = await positionSide === 'short' || positionSide === 'sell' ? (entryPrice - (0.025 * entryPrice )): (entryPrice + (0.025 * entryPrice ))
        let stopLossThreshold = -(3 * initialMargin);
        let takeProfitThreshold = 0.6 * initialMargin;


        async function setSLTPorders() { 
            // take profit 

            if (unrealizedPnl >= (4 * takeProfitThreshold)) {
                await binance.createTrailingPercentOrder(positionSymbol, 'trailing_stop', side, positionContracts, undefined, 5);
                console.log(`take profit for ${positionSymbol}`);
            } else if (unrealizedPnl >= takeProfitThreshold) {
                await binance.createTrailingPercentOrder(positionSymbol, 'trailing_stop', side, positionContracts, undefined, 2);
                console.log(`take profit for ${positionSymbol}`);
            } else  if (unrealizedPnl < takeProfitThreshold ) {
                await binance.createTrailingPercentOrder(positionSymbol, 'trailing_stop', side, positionContracts, undefined, 1, takeProfitPrice);
                console.log(`take profit for ${positionSymbol}`);
            } 
        
        }

        async function setStopLossOrders() {
            // check if existing stop loss

            try {
                if (unrealizedPnl >= (0.3 * initialMargin)) {
                    await binance.createStopLossOrder(positionSymbol, undefined, side, positionContracts, entryPrice)
                    console.log(`stop loss for ${positionSymbol}`);
                }
            } catch (error) {
                console.log(`unable to play stop loss`);
            }

       
        }

            //add more 

        async function setAddmore() {

            if (positionSide === 'short' || positionSide === 'sell') {
                if (rsi1d > 80 || rsi4h > 80) {

                    if (unrealizedPnl < stopLossThreshold) {

                         console.log(rsi4h, rsi1d, positionSymbol);

                         let reSide = positionSide === 'short' || positionSide === 'sell' ? 'sell' : 'buy';
                        
                         await binance.createTrailingPercentOrder(positionSymbol, 'trailing_stop', reSide``, (1.75 * positionContracts), undefined, 5);
                         console.log(`add more for ${positionSymbol}`);
                    }
                }
            }

            if (positionSide === 'long' || positionSide === 'buy') {
                if (rsi1d < 20 || rsi4h < 20) {
                    if (unrealizedPnl < stopLossThreshold) {
                         await binance.createTrailingPercentOrder(positionSymbol, 'trailing_stop', positionSide, (1.75 * positionContracts), undefined, 5);
                         console.log(`add more for ${positionSymbol}`);
                    }
                }
            }
        }

        

        // check existing orders 

        if (getPositionOrders.length === 0) {
            setSLTPorders()
            setAddmore()
            setStopLossOrders()
        } 

        if (getPositionOrders.length  == 1) {

            if (getPositionOrders[0].side == side) {
                setAddmore()
                setStopLossOrders()
            } 

            if (getPositionOrders[0].side != side) {

                setSLTPorders()
                setStopLossOrders()
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
