

async function analyseFibonacci(historicalData) {


    let fibonacciLevels ;
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

    let closeData = await ohlcv.close.slice(ohlcv.close.length - 50)
    let highData = await ohlcv.high.slice(ohlcv.high.length - 50)
    let lowData = await ohlcv.low.slice(ohlcv.low.length - 50)

    // Function to identify swing highs and lows from the given data
    function findSwingHighsAndLows(dataLow, dataHigh) {
        // Initialize arrays to store swing highs and lows
        const swingHighs = [];
        const swingLows = [];

        // Iterate over the data points to find swing highs and lows
        for (let i = 1; i < dataHigh.length - 1; i++) {

            const prev = dataHigh[i - 1];
            const curr = dataHigh[i];
            const next = dataHigh[i + 1];

            // Check if the current price is a swing high or low
            if (curr > prev && curr > next) {
                // If current price is a swing high, push it to the swingHighs array
                swingHighs.push({ index: i, value: curr });
            } 
        }

        for (let i = 1; i < dataLow.length - 1; i++) {

            const prev = dataLow[i - 1];
            const curr = dataLow[i];
            const next = dataLow[i + 1];

            // Check if the current price is a swing high or low
           if (curr < prev && curr < next) {
                // If current price is a swing low, push it to the swingLows array
                swingLows.push({ index: i, value: curr });
            }
        }

        // Return the identified swing highs and lows
        return { swingHighs, swingLows };
    }

    // Function to calculate Fibonacci retracement levels based on start and end points
    function fibonacciRetracement(end, start) {
        // Define Fibonacci retracement levels
        const fibLevels = [-0.236, -0.382,-0.5,-0.618, -0.786, 0, 0.236, 0.382, 0.5, 0.618, 0.786, 1.,1.236,1.382, 1.5, 1.618, 2.618, 3.618, 4.236];
        const levels = {};

        // Calculate the difference between start and end points
        const diff = end - start;
        // Calculate retracement levels for each Fibonacci level
        for (const level of fibLevels) {
            const retracement = end - (diff * level);
            // Store the retracement level in the levels object
            levels[level] = retracement;
        }

        // Return the calculated retracement levels
        return levels;
    }

    async function main() {

        // Find swing highs and lows from the fetched historical data
        const { swingHighs, swingLows } = findSwingHighsAndLows(lowData, highData)

        // Get the lowest swing low and highest swing high as significant points
        const significantLow = swingLows.reduce((min, curr) => curr.value < min ? curr.value : min, Number.MAX_SAFE_INTEGER);
        const significantHigh = swingHighs.reduce((max, curr) => curr.value > max ? curr.value : max, Number.MIN_SAFE_INTEGER);

     

        // Calculate Fibonacci retracement levels based on the recent swing high and low
        const retracementLevels = fibonacciRetracement(significantLow, significantHigh)

        fibonacciLevels = retracementLevels
    }

    main()

  


    return fibonacciLevels
   
}




module.exports = {
    analyseFibonacci
}


