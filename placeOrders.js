async function orderSymbol(sym, side, binance, price, getUSDTBalance) {
    try {
        let trailingStopPercentage = 3
        let leverage =  await binance.fetchLeverages(sym)
        let baseOrderAmount = ((0.0125 * getUSDTBalance) * 20)/ price
        let triggerPrice = await side == 'buy' ? (price - (0.005 * price)) : (price + (0.005 * price))

        let additionalParams = await side == 'buy' ? 'LONG': 'SHORT'
    
        await binance.createTrailingPercentOrder(sym, 'trailing_stop',side, baseOrderAmount, undefined, trailingStopPercentage, triggerPrice, undefined)

        console.log(`${sym} ${side} order has been placed at ${price}`);

    } catch (error) {
        // console.log(`could not order ${sym} `);
        console.log(error.message);
    }

}

async function cancelExistingOrders(markets, binance, getUSDTBalance) {


    try {
        let timeNow = new Date().getTime()
   

        for (market of markets) {


             let marketSymbol =await market[0]
             let marketSide = await market[1] >= 0 ? 'buy': 'sell'
             let currentPrice = await market[2]
             let openOrders = await binance.fetchOpenOrders(marketSymbol)
             
     
            if (openOrders.length == 0) {
               await orderSymbol(marketSymbol, marketSide, binance, currentPrice, getUSDTBalance)
             }

            if (openOrders.length > 0) {
                for (const ord of openOrders) {
                    if (timeNow > (ord.lastUpdateTimestamp + 86400000) ) {
                        await binance.cancelOrder(ord.id, ord.info.symbol);
                    }

                    if (ord.info.priceRate == 0.75) { //checkriskmanagement setSLTPorders() 
                        //set order
                    }
                }
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