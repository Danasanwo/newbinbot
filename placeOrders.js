async function orderSymbol(sym, side, binance, price, getUSDTBalance) {
    try {
        let trailingStopPercentage = 2
        let leverage =  await binance.fetchLeverages(sym)
        let baseOrderAmount = ((0.0075 * getUSDTBalance) * 20)/ price
        let triggerPrice = await side == 'buy' ? (price - (0.005 * price)) : (price + (0.005 * price))

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
        let timeNow = new Date().getTime()
   

        for (market of markets) {


             let marketSymbol =await market[0]
             let marketSide 
             let currentPrice = await market[2]
             let openOrders = await binance.fetchOpenOrders(marketSymbol)
             let rsi4h = await market[3]
             let rsi1d = await market[4]
     
     
            if (openOrders.length == 0) {
            

                if (rsi4h > 70 || rsi4h < 30) {

                    marketSide = rsi4h > 70 ? 'sell': 'buy'

                    await orderSymbol(marketSymbol, marketSide, binance, currentPrice, getUSDTBalance)

                } else if ((rsi1d > 70 || rsi1d < 30)) {
                    marketSide = rsi1d > 70 ? 'sell': 'buy'

                    await orderSymbol(marketSymbol, marketSide, binance, currentPrice, getUSDTBalance)
  

                }

             }

            if (openOrders.length > 0) {
                for (const ord of openOrders) {
                    if (timeNow > (ord.lastUpdateTimestamp + 86400000) ) {
                        await binance.cancelOrder(ord.id, ord.info.symbol);
                    }

                    // if (ord.info.priceRate == 2) { //checkriskmanagement setSLTPorders() 
                    //     //set order
                    // }
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


async function findArrayWithElement(arr, element) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes(element)) {
            return arr[i];
        }
    }
    return null; // Return null if the element is not found in any of the arrays
}

module.exports = {
    orderSymbol,
    getAllOrders,
    cancelExistingOrders,
    removePositionsFromSymbolData,
    findArrayWithElement
}