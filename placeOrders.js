async function orderSymbol(sym, side, binance, price, getUSDTBalance) {
    try {
        let trailingStopPercentage = 2
        let leverage =  await binance.fetchLeverages(sym)
        let baseOrderAmount = ((0.04 * getUSDTBalance) * 20)/ price

        let additionalParams = await side == 'buy' ? 'LONG': 'SHORT'
    
        await binance.createTrailingPercentOrder(sym, 'trailing_stop',side, baseOrderAmount, undefined, trailingStopPercentage, undefined, undefined)

        console.log(`${sym} ${side} order has been placed at ${price}`);

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
             
     
             if (openOrders.length == 0) {
               await orderSymbol(marketSymbol, marketSide, binance, currentPrice, getUSDTBalance)
             }
         
        }
        
    } catch (error) {
        console.log(`could not check for existing item`);
    }




}

function removePositionsFromSymbolData(array, values) {
 return  array.filter(item => !values.includes(item[0]))
}

 


async function getAllOrders(markets, binance) {
    let allOrders = []
    for (market of markets){

        let orders = await binance.fetchOpenOrders(market)

        if (orders.length > 0) {
            for (const order of orders) {
                allOrders.push(order)
            }
        }
    }

    return allOrders
}


module.exports = {
    orderSymbol,
    getAllOrders,
    cancelExistingOrders,
    removePositionsFromSymbolData
}