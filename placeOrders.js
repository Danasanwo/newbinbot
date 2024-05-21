async function orderSymbol(sym, side, binance, price, getUSDTBalance, amount) {
    try {
        let trailingStopPercentage = 2.5
        let leverage =  await binance.fetchLeverages(sym)
        let baseOrderAmount = ((0.014 * getUSDTBalance * amount) * 20)/ price
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
             let bullBear4h = market[5].bullish - market[5].bearish
             let bullBear1d = market[6].bullish - market[6].bearish

             console.log(`bullbear4h: ${bullBear4h}, bullbear1d: ${bullBear1d}`);
     

            if (openOrders.length == 0) {
            

                if ((rsi4h > 70 && (bullBear4h <= 0 && bullBear1d <= 0))|| (rsi4h < 30 && (bullBear4h >= 0 && bullBear1d >= 0))) {

                    marketSide = rsi4h > 70 ? 'sell': 'buy'

                    let tradeAmount = 0.5

                    if (rsi4h > 90) tradeAmount = 1
                    else if (rsi4h > 80) tradeAmount = 0.75

                    await orderSymbol(marketSymbol, marketSide, binance, currentPrice, getUSDTBalance, tradeAmount)

                } else if ((rsi1d > 70 || rsi1d < 30)) {
                    marketSide = rsi1d > 70 ? 'sell': 'buy'

                    let tradeAmount = 0.8

                    if (rsi4h > 90) tradeAmount = 1.5
                    else if (rsi4h > 80) tradeAmount = 1

                    await orderSymbol(marketSymbol, marketSide, binance, currentPrice, getUSDTBalance, tradeAmount)


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