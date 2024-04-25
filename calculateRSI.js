
const indicatorApi = require("technicalindicators")
const indicatorts = require("indicatorts")


async function calculateRSI(historicalData) {
    try {

        let period = 14

        let ohlcv = {
            open: [],
            high: [],
            low: [],
            close: [],
            volume: []
        }

        for (const x of historicalData) {
            ohlcv.open.push(x[1])
            ohlcv.high.push(x[2])
            ohlcv.low.push(x[3])
            ohlcv.close.push(x[4])
            ohlcv.volume.push(x[5])
        }



        if (ohlcv.close.length <= period + 1) {
            throw new Error("Data length must be greater than period.");
        }

        
        let data = await ohlcv.close
    
        let gain = 0;
        let loss = 0;
    
        // Calculate initial gain and loss
        for (let i = 1; i <= period; i++) {
            const priceDiff = data[i] - data[i - 1];
            if (priceDiff > 0) {
                gain += priceDiff;
            } else {
                loss += Math.abs(priceDiff);
            }
        }
    
        const avgGain = gain / period;
        const avgLoss = loss / period;
        const RS = avgGain / avgLoss;

        const RSISeries = [100 - (100 / (1 + RS))];
    
        // Calculate RSI for subsequent periods
        for (let i = period + 1; i < data.length; i++) {
            const priceDiff = data[i] - data[i - 1];
            if (priceDiff > 0) {
                gain = (gain * (period - 1) + priceDiff) / period;
                loss = (loss * (period - 1)) / period;
            } else {
                gain = (gain * (period - 1)) / period;
                loss = (loss * (period - 1) + Math.abs(priceDiff)) / period;
            }
            const RS = gain / loss;
            const RSIScore = 100 - (100 / (1 + RS));
            RSISeries.push(RSIScore);
        }
    


        return RSISeries[RSISeries.length - 1]

        
    } catch (error) {
        console.log('could not get RSI');
    }

}



module.exports = {
    calculateRSI
}