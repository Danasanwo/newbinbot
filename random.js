function analyseCandlesticks(historicalData) {
    let direction = {
        bullish: 0,
        bullish_name: [],
        bearish: 0,
        bearish_name: []
    };
    let ohlcv = historicalData;

    // Create objects for OHLCV data
    const todayOHLCV = {
        O: ohlcv[ohlcv.length - 1][1], // Open
        H: ohlcv[ohlcv.length - 1][2], // High
        L: ohlcv[ohlcv.length - 1][3], // Low
        C: ohlcv[ohlcv.length - 1][4], // Close
        V: ohlcv[ohlcv.length - 1][5],  // Volume
        body: Math.abs(ohlcv[ohlcv.length - 1][1] - ohlcv[ohlcv.length - 1][4]), // Body length
        upperShadow: ohlcv[ohlcv.length - 1][2] - Math.max(ohlcv[ohlcv.length - 1][1], ohlcv[ohlcv.length - 1][4]), // Upper shadow length
        lowerShadow: Math.min(ohlcv[ohlcv.length - 1][1], ohlcv[ohlcv.length - 1][4]) - ohlcv[ohlcv.length - 1][3], // Lower shadow length
        bodyTop: Math.max(ohlcv[ohlcv.length - 1][1], ohlcv[ohlcv.length - 1][4]), // Highest point of the body
        bodyBottom: Math.min(ohlcv[ohlcv.length - 1][1], ohlcv[ohlcv.length - 1][4]), // Lowest point of the body
        bullish: ohlcv[ohlcv.length - 1][4] > ohlcv[ohlcv.length - 1][1], // Is bullish
        bearish: ohlcv[ohlcv.length - 1][4] < ohlcv[ohlcv.length - 1][1] // Is bearish
    };

    const yesterdayOHLCV = {
        O: ohlcv[ohlcv.length - 2][1], // Open
        H: ohlcv[ohlcv.length - 2][2], // High
        L: ohlcv[ohlcv.length - 2][3], // Low
        C: ohlcv[ohlcv.length - 2][4], // Close
        V: ohlcv[ohlcv.length - 2][5],  // Volume
        body: Math.abs(ohlcv[ohlcv.length - 2][1] - ohlcv[ohlcv.length - 2][4]), // Body length
        upperShadow: ohlcv[ohlcv.length - 2][2] - Math.max(ohlcv[ohlcv.length - 2][1], ohlcv[ohlcv.length - 2][4]), // Upper shadow length
        lowerShadow: Math.min(ohlcv[ohlcv.length - 2][1], ohlcv[ohlcv.length - 2][4]) - ohlcv[ohlcv.length - 2][3], // Lower shadow length
        bodyTop: Math.max(ohlcv[ohlcv.length - 2][1], ohlcv[ohlcv.length - 2][4]), // Highest point of the body
        bodyBottom: Math.min(ohlcv[ohlcv.length - 2][1], ohlcv[ohlcv.length - 2][4]), // Lowest point of the body
        bullish: ohlcv[ohlcv.length - 2][4] > ohlcv[ohlcv.length - 2][1], // Is bullish
        bearish: ohlcv[ohlcv.length - 2][4] < ohlcv[ohlcv.length - 2][1] // Is bearish
    };

    const threeDaysAgoOHLCV = {
        O: ohlcv[ohlcv.length - 3][1], // Open
        H: ohlcv[ohlcv.length - 3][2], // High
        L: ohlcv[ohlcv.length - 3][3], // Low
        C: ohlcv[ohlcv.length - 3][4], // Close
        V: ohlcv[ohlcv.length - 3][5],  // Volume
        body: Math.abs(ohlcv[ohlcv.length - 3][1] - ohlcv[ohlcv.length - 3][4]), // Body length
        upperShadow: ohlcv[ohlcv.length - 3][2] - Math.max(ohlcv[ohlcv.length - 3][1], ohlcv[ohlcv.length - 3][4]), // Upper shadow length
        lowerShadow: Math.min(ohlcv[ohlcv.length - 3][1], ohlcv[ohlcv.length - 3][4]) - ohlcv[ohlcv.length - 3][3], // Lower shadow length
        bodyTop: Math.max(ohlcv[ohlcv.length - 3][1], ohlcv[ohlcv.length - 3][4]), // Highest point of the body
        bodyBottom: Math.min(ohlcv[ohlcv.length - 3][1], ohlcv[ohlcv.length - 3][4]), // Lowest point of the body
        bullish: ohlcv[ohlcv.length - 3][4] > ohlcv[ohlcv.length - 3][1], // Is bullish
        bearish: ohlcv[ohlcv.length - 3][4] < ohlcv[ohlcv.length - 3][1] // Is bearish
    };

    const fourDaysAgoOHLCV = {
        O: ohlcv[ohlcv.length - 4][1], // Open
        H: ohlcv[ohlcv.length - 4][2], // High
        L: ohlcv[ohlcv.length - 4][3], // Low
        C: ohlcv[ohlcv.length - 4][4], // Close
        V: ohlcv[ohlcv.length - 4][5],  // Volume
        body: Math.abs(ohlcv[ohlcv.length - 4][1] - ohlcv[ohlcv.length - 4][4]), // Body length
        upperShadow: ohlcv[ohlcv.length - 4][2] - Math.max(ohlcv[ohlcv.length - 4][1], ohlcv[ohlcv.length - 4][4]), // Upper shadow length
        lowerShadow: Math.min(ohlcv[ohlcv.length - 4][1], ohlcv[ohlcv.length - 4][4]) - ohlcv[ohlcv.length - 4][3], // Lower shadow length
        bodyTop: Math.max(ohlcv[ohlcv.length - 4][1], ohlcv[ohlcv.length - 4][4]), // Highest point of the body
        bodyBottom: Math.min(ohlcv[ohlcv.length - 4][1], ohlcv[ohlcv.length - 4][4]), // Lowest point of the body
        bullish: ohlcv[ohlcv.length - 4][4] > ohlcv[ohlcv.length - 4][1], // Is bullish
        bearish: ohlcv[ohlcv.length - 4][4] < ohlcv[ohlcv.length - 4][1] // Is bearish
    };

   
    // Function to detect Bullish Engulfing Pattern
    function detectBullishEngulfing() {
        if (ohlcv.length < 2) return false; // Need at least two candles for this pattern

        // Check if the current candle is bullish and the previous candle is bearish
        if (todayOHLCV.bullish && yesterdayOHLCV.bearish) {
            // Check if the body of the bullish candle completely engulfs the body of the previous bearish candle
            if (todayOHLCV.bodyTop > yesterdayOHLCV.bodyTop && todayOHLCV.bodyBottom < yesterdayOHLCV.bodyBottom) {
                direction.bullish += 1.5;
                direction.bullish_name.push('Bullish Engulfing');
                return true;
            } 
        } 
        return false;
    }

    // Function to detect Bearish Engulfing Pattern
    function detectBearishEngulfing() {
        if (ohlcv.length < 2) return false; // Need at least two candles for this pattern

        // Check if the current candle is bearish and the previous candle is bullish
        if (todayOHLCV.bearish && yesterdayOHLCV.bullish) {
            // Check if the body of the bearish candle completely engulfs the body of the previous bullish candle
            if (todayOHLCV.bodyTop > yesterdayOHLCV.bodyTop && todayOHLCV.bodyBottom < yesterdayOHLCV.bodyBottom) {
                direction.bearish += 1.5;
                direction.bearish_name.push('Bearish Engulfing');
                return true;
            }
        }
        return false;
    }

    // Function to detect Hammer pattern
    function detectHammer() {
        const bodyLength = todayOHLCV.body;
        const lowerShadowLength = todayOHLCV.lowerShadow;
        const upperShadowLength = todayOHLCV.upperShadow;

        // Conditions for a Hammer pattern
        if (lowerShadowLength >= bodyLength * 2 && // Lower shadow is at least twice as big as the body
            upperShadowLength < bodyLength * 0.4 && // Upper shadow is small
            fourDaysAgoOHLCV.O > yesterdayOHLCV.C) { // Occurs during a downtrend
            direction.bullish += 1;
            direction.bullish_name.push('Hammer');  
            return true;
        }
        return false;
    }

        // Function to detect Inverted Hammer pattern
    function detectInvertedHammer() {
        const bodyLength = todayOHLCV.body;
        const lowerShadowLength = todayOHLCV.lowerShadow;
        const upperShadowLength = todayOHLCV.upperShadow;

        // Conditions for an Inverted Hammer pattern
        if (upperShadowLength >= bodyLength * 2 && // Upper shadow is at least twice as big as the body
            lowerShadowLength < bodyLength * 0.4 && // Lower shadow is small
            fourDaysAgoOHLCV.O > yesterdayOHLCV.C) { // Occurs during a downtrend
            direction.bullish += 1;
            direction.bullish_name.push('Inverted Hammer');  
            return true;
        }
        return false;
    }

        // Function to detect Shooting Star pattern
    function detectShootingStar() {
        const bodyLength = todayOHLCV.body;
        const lowerShadowLength = todayOHLCV.lowerShadow;
        const upperShadowLength = todayOHLCV.upperShadow;

        // console.log(bodyLength, lowerShadowLength, upperShadowLength);

        // Conditions for a Shooting Star pattern
        if (upperShadowLength >= bodyLength * 2 && // Upper shadow is at least twice as big as the body
            lowerShadowLength < bodyLength * 0.4 && // Lower shadow is small
            fourDaysAgoOHLCV.O < yesterdayOHLCV.C) { // Previous candle was bullish
            direction.bearish += 1;
            direction.bearish_name.push('Shooting Star');  
            return true;
        }
        return false;
    }

    // Function to detect Hanging Man pattern
    function detectHangingMan() {
        const bodyLength = todayOHLCV.body;
        const lowerShadowLength = todayOHLCV.lowerShadow;
        const upperShadowLength = todayOHLCV.upperShadow;

        // Conditions for a Hanging Man pattern
        if (lowerShadowLength >= bodyLength * 2 && // Lower shadow is at least twice as big as the body
           upperShadowLength < bodyLength * 0.4 && // Upper shadow is small
            fourDaysAgoOHLCV.O < yesterdayOHLCV.C) { // Previous candle was bullish
            direction.bearish += 1;
            direction.bearish_name.push('Hanging Man');  
            return true;
        }
        return false;
    }

        // Function to detect Three White Soldiers pattern
    function detectThreeWhiteSoldiers() {
        // Check if there are at least three candles
        if (ohlcv.length < 3) return false;

        // console.log([threeDaysAgoOHLCV.O, threeDaysAgoOHLCV.C], [yesterdayOHLCV.O, yesterdayOHLCV.C], [todayOHLCV.O, todayOHLCV.C]);

        if ( todayOHLCV.body < (1.5 *(todayOHLCV.upperShadow + todayOHLCV.lowerShadow))) return false
        if ( yesterdayOHLCV.body < (1.5 *(yesterdayOHLCV.upperShadow + yesterdayOHLCV.lowerShadow))) return false
        if ( threeDaysAgoOHLCV.body < (1.5 *(threeDaysAgoOHLCV.upperShadow + threeDaysAgoOHLCV.lowerShadow))) return false

        // Check if the last three candles are bullish
        if (todayOHLCV.bullish && yesterdayOHLCV.bullish && threeDaysAgoOHLCV.bullish) {
            // Check if each candle closes higher than the previous one
            if (todayOHLCV.C > yesterdayOHLCV.C && yesterdayOHLCV.C > threeDaysAgoOHLCV.C) {
                direction.bullish += 2;
                direction.bullish_name.push('Three White Soldiers');
                
                return true;
            }

        }
        return false;
    }

    // Function to detect Three Black Crows pattern
    function detectThreeBlackCrows() {
        // Check if there are at least three candles
        if (ohlcv.length < 3) return false;

        if ( todayOHLCV.body < (1.5 *(todayOHLCV.upperShadow + todayOHLCV.lowerShadow))) return false
        if ( yesterdayOHLCV.body < (1.5 *(yesterdayOHLCV.upperShadow + yesterdayOHLCV.lowerShadow))) return false
        if ( threeDaysAgoOHLCV.body < (1.5 *(threeDaysAgoOHLCV.upperShadow + threeDaysAgoOHLCV.lowerShadow))) return false

        // Check if the last three candles are bearish
        if (todayOHLCV.bearish && yesterdayOHLCV.bearish && threeDaysAgoOHLCV.bearish) {
            // Check if each candle closes lower than the previous one
            if (todayOHLCV.C < yesterdayOHLCV.C && yesterdayOHLCV.C < threeDaysAgoOHLCV.C) {
                direction.bearish += 2;
                direction.bearish_name.push('Three Black Crows');
                return true;
            }
        }
        return false;
    }

        // Function to detect Dark Cloud Cover pattern
    function detectDarkCloudCover() {
        // Check if there are at least two candles
        if (ohlcv.length < 2) return false;

        // Check if the current candle is bearish and the previous candle is bullish
        if (todayOHLCV.bearish && yesterdayOHLCV.bullish) {
            // Check if the current candle opens above the previous candle's high
            if (todayOHLCV.O > yesterdayOHLCV.H) {
                // Check if the current candle closes below the midpoint of the previous candle's body
                if (todayOHLCV.close < (yesterdayOHLCV.bodyBottom + (0.5 * yesterdayOHLCV.body))) {
                    direction.bearish += 1.5;
                    direction.bearish_name.push('Dark Cloud Cover');
                    return true;
                }
            }
        }
        return false;
    }

    // Function to detect Piercing Pattern
    function detectPiercingPattern() {
        // Check if there are at least two candles
        if (ohlcv.length < 2) return false;

        // Check if the current candle is bullish and the previous candle is bearish
        if (todayOHLCV.bullish && yesterdayOHLCV.bearish) {
            // Check if the current candle opens below the previous candle's low
            if (todayOHLCV.O < yesterdayOHLCV.L) {
                // Check if the current candle closes above the midpoint of the previous candle's body
                if (todayOHLCV.close > (yesterdayOHLCV.bodyBottom + (0.5 * yesterdayOHLCV.body))) {
                    direction.bullish += 1.5;
                    direction.bullish_name.push('Piercing Pattern');
                    return true;
                }
            }
        }
        return false;
    }

        // Function to detect Bullish Harami pattern
    function detectBullishHarami() {
        // Check if there are at least two candles
        if (ohlcv.length < 2) return false;

        // Check if the current candle is bullish and the previous candle is bearish
        if (todayOHLCV.bullish && yesterdayOHLCV.bearish) {
            // Check if the current candle's body is within the previous candle's body
            if (todayOHLCV.bodyTop < yesterdayOHLCV.bodyTop && todayOHLCV.bodyBottom > yesterdayOHLCV.bodyBottom) {
                direction.bullish += 1;
                direction.bullish_name.push('Bullish Harami');
                return true;
            }
        }
        return false;
    }

    // Function to detect Bearish Harami pattern
    function detectBearishHarami() {
        // Check if there are at least two candles
        if (ohlcv.length < 2) return false;
        // Check if the current candle is bearish and the previous candle is bullish
        if (todayOHLCV.bearish && yesterdayOHLCV.bullish) {
            // Check if the current candle's body is within the previous candle's body
            if (todayOHLCV.bodyTop < yesterdayOHLCV.bodyTop && todayOHLCV.bodyBottom > yesterdayOHLCV.bodyBottom) {
                direction.bearish += 1;
                direction.bearish_name.push('Bearish Harami');
                return true;
            }
        }
        return false;
    }

    // Function to detect Doji pattern
    function detectDoji(ohlcvData) {
        // Calculate the size of the candle's body
        const bodyLength = ohlcvData.body;

        // Calculate the size of the candle's shadows
        const totalShadowLength = ohlcvData.upperShadow + ohlcvData.lowerShadow;

        // Check if the body length is very small compared to the total shadow length
        if (bodyLength < totalShadowLength * 0.2) {
            return true;
        }

        return false;
    }

    // Function to detect Bullish Harami Cross pattern
    function detectBullishHaramiCross() {
        // Check if there are at least two candles
        if (ohlcv.length < 2) return false;

        if (!detectDoji(todayOHLCV)) return false

        // Check if the current candle is bullish and the previous candle is bearish

        if (yesterdayOHLCV.bearish) {

            // Check if the current candle's body is small and within the previous candle's body
            if (todayOHLCV.body < yesterdayOHLCV.body * 0.3 && todayOHLCV.H < yesterdayOHLCV.bodyTop && todayOHLCV.L > yesterdayOHLCV.bodyBottom) {
                direction.bullish += 1.5;
                direction.bullish_name.push('Bullish Harami Cross');
                return true;
            }
        }

        return false;
    }

    // Function to detect Bearish Harami Cross pattern
    function detectBearishHaramiCross() {
        // Check if there are at least two candles
        if (ohlcv.length < 2) return false;

        if (!detectDoji(todayOHLCV)) return false

        // Check if the current candle is bearish and the previous candle is bullish
        if ( yesterdayOHLCV.bullish) {
            // Check if the current candle's body is small and within the previous candle's body
            if (todayOHLCV.body < yesterdayOHLCV.body * 0.3 && todayOHLCV.H < yesterdayOHLCV.bodyTop && todayOHLCV.L > yesterdayOHLCV.bodyBottom) {
                direction.bearish += 1.5;
                direction.bearish_name.push('Bearish Harami Cross');
                return true;
            }
        }
        return false;
    }

    // Function to detect Bullish Belt Hold pattern
    function detectBullishBeltHold() {
        // Check if there are at least two candles

        if (ohlcv.length < 2) return false;

        if (fourDaysAgoOHLCV.O < yesterdayOHLCV.C) return false 

        // Check if yesterday's candle is bearish
        if (!yesterdayOHLCV.bearish) return false;

        // Check if today's candle is bullish
        if (!todayOHLCV.bullish) return false;

        // Check if today's candle opens at the low and closes near the high
        if (todayOHLCV.O == todayOHLCV.L && todayOHLCV.C > todayOHLCV.O && (todayOHLCV.H - todayOHLCV.C) <= (0.1 * (todayOHLCV.H - todayOHLCV.L))) {
            direction.bullish += 1.5;
            direction.bullish_name.push('Bullish Belt Hold');
            return true;
        }
        return false;
    }

    // Function to detect Bearish Belt Hold pattern
    function detectBearishBeltHold() {
        // Check if there are at least two candles
        if (ohlcv.length < 2) return false;

        if (fourDaysAgoOHLCV.O > yesterdayOHLCV.C) return false 

        // Check if yesterday's candle is bullish
        if (!yesterdayOHLCV.bullish) return false;

        // Check if today's candle is bearish
        if (!todayOHLCV.bearish) return false;

        // Check if today's candle opens at the high and closes near the low
        if (todayOHLCV.O == todayOHLCV.H && todayOHLCV.C < todayOHLCV.O && (todayOHLCV.C - todayOHLCV.L) <= (0.1 * (todayOHLCV.H - todayOHLCV.L))) {
            direction.bearish += 1.5;
            direction.bearish_name.push('Bearish Belt Hold');
            return true;
        }
        return false;
    }

    // Function to detect Bullish Kicker pattern
    function detectBullishKicker() {
        // Check if there are at least two candles
        if (ohlcv.length < 2) return false;

        // Check if yesterday's candle is bearish
        if (!yesterdayOHLCV.bearish) return false;

        // Check if today's candle is bullish
        if (!todayOHLCV.bullish) return false;

        // Check if today's open is above yesterday's high
        if (todayOHLCV.O > yesterdayOHLCV.H) {
            direction.bullish += 1.5;
            direction.bullish_name.push('Bullish Kicker');
            return true;
        }
        return false;
    }

    // Function to detect Bearish Kicker pattern
    function detectBearishKicker() {
        // Check if there are at least two candles
        if (ohlcv.length < 2) return false;

        // Check if yesterday's candle is bullish
        if (!yesterdayOHLCV.bullish) return false;

        // Check if today's candle is bearish
        if (!todayOHLCV.bearish) return false;

        // Check if today's open is below yesterday's low
        if (todayOHLCV.O < yesterdayOHLCV.L) {
            direction.bearish += 1.5;
            direction.bearish_name.push('Bearish Kicker');
            return true;
        }
        return false;
    }


     // Function to detect Bullish Marubozu pattern
    function detectBullishMarubozu() {
        // Check if there are enough candles
        if (ohlcv.length < 1) return false;

        const currentCandle = todayOHLCV;

        // Check if the candle is bullish
        if (!currentCandle.bullish) return false;

        // Check if there are no or very small upper and lower shadows
        if ((currentCandle.upperShadow > 0.05 * currentCandle.body)  || currentCandle.lowerShadow > 0.05 * currentCandle.body) return false;

        direction.bullish += 1;
        direction.bullish_name.push('Bullish Marubozu');
        return true;
    }

    // Function to detect Bearish Marubozu pattern
    function detectBearishMarubozu() {
        // Check if there are enough candles
        if (ohlcv.length < 1) return false;

        const currentCandle = todayOHLCV;

        // Check if the candle is bearish
        if (!currentCandle.bearish) return false;

        // Check if there are no or very small upper and lower shadows
        if (currentCandle.upperShadow > 0.01 * currentCandle.body || currentCandle.lowerShadow > 0.01 * currentCandle.body) return false;


        direction.bearish += 1;
        direction.bearish_name.push('Bearish Marubozu');
        return true;
    }

    // Function to detect Bullish Side-by-Side White Lines pattern
    function detectBullishSideBySideWhiteLines() {
        // Check if there are at least two candles
        if (ohlcv.length < 2) return false;

        // Check if the first candle is white (bullish) and in an uptrend
        if (!(yesterdayOHLCV.bullish && yesterdayOHLCV.C > yesterdayOHLCV.O)) return false;

        // Check if the second candle is white (bullish) and opens within the prior candle's body
        if (!(todayOHLCV.bullish && todayOHLCV.O > yesterdayOHLCV.bodyBottom && todayOHLCV.O < yesterdayOHLCV.bodyTop)) return false;

        direction.bullish += 1.5;
        direction.bullish_name.push('Bullish Side-by-Side White Lines');
        return true;
    }

    // Function to detect Bearish Side-by-Side Black Lines pattern
    function detectBearishSideBySideBlackLines() {
        // Check if there are at least two candles
        if (ohlcv.length < 2) return false;

        // Check if the first candle is black (bearish) and in a downtrend
        if (!(yesterdayOHLCV.bearish && yesterdayOHLCV.C < yesterdayOHLCV.O)) return false;

        // Check if the second candle is black (bearish) and opens within the prior candle's body
        if (!(todayOHLCV.bearish && todayOHLCV.O > yesterdayOHLCV.bodyBottom && todayOHLCV.O < yesterdayOHLCV.bodyTop)) return false;

        direction.bearish += 1.5;
        direction.bearish_name.push('Bearish Side-by-Side Black Lines');
        return true;
    }


    // function to detect bullish abandoned baby 
    function detectBullishAbandonedBaby() {

        if (ohlcv.length < 3) return false;

        if (!threeDaysAgoOHLCV.bearish) return false


        if (threeDaysAgoOHLCV.L < yesterdayOHLCV.O) return false

        if (!detectDoji(yesterdayOHLCV)) return false

        if (todayOHLCV.O < yesterdayOHLCV.H) return false

        if (!todayOHLCV.bullish) return false

        direction.bullish += 2;
        direction.bullish_name.push('Bullish abandoned baby');
        return true;


    }

    //function to detect bearish abandoned baby
    function detectBearishAbandonedBaby() {

        if (ohlcv.length < 3) return false;

        if (!threeDaysAgoOHLCV.bullish) return false


        if (threeDaysAgoOHLCV.H > yesterdayOHLCV.O) return false

        if (!detectDoji(yesterdayOHLCV)) return false

        if (todayOHLCV.O > yesterdayOHLCV.L) return false

        if (!todayOHLCV.bearish) return false

        direction.bearish += 2;
        direction.bearish_name.push('Bearish abandoned baby');
        return true;

    }

    //function to detect bullish tristar
    function detectBullishTriStar() {
        if (ohlcv.length < 3) return false;

        

        if (!detectDoji(threeDaysAgoOHLCV)) return false
        if (!detectDoji(yesterdayOHLCV)) return false
        if (!detectDoji(todayOHLCV)) return false

        if (yesterdayOHLCV.bodyTop > threeDaysAgoOHLCV.bodyTop) return false
        if (yesterdayOHLCV.bodyTop > todayOHLCV.bodyTop) return false


        direction.bullish += 2;
        direction.bullish_name.push('Bullish Tri Star');
        return true;

    }

    //function to detect bearish tristar
    function detectBearishTriStar() {
        if (ohlcv.length < 3) return false;

        

        if (!detectDoji(threeDaysAgoOHLCV)) return false
        if (!detectDoji(yesterdayOHLCV)) return false
        if (!detectDoji(todayOHLCV)) return false

        if (yesterdayOHLCV.bodyTop < threeDaysAgoOHLCV.bodyTop) return false
        if (yesterdayOHLCV.bodyTop < todayOHLCV.bodyTop) return false


        direction.bearish += 2;
        direction.bearish_name.push('Bullish Tri Star');
        return true;
    }

    // function to detect bullish three line strike 
    function detectBullishThreeLineStrike() {
        if (ohlcv.length < 4) return false;

        

       if (!fourDaysAgoOHLCV.bullish && !threeDaysAgoOHLCV.bullish && !fourDaysAgoOHLCV.bullish) return false

        if (threeDaysAgoOHLCV.bodyTop < fourDaysAgoOHLCV.bodyTop && threeDaysAgoOHLCV.bodyBottom < fourDaysAgoOHLCV.bodyBottom) return false
        if (yesterdayOHLCV.bodyTop < threeDaysAgoOHLCV.bodyTop && yesterdayOHLCV.bodyBottom < threeDaysAgoOHLCV.bodyBottom) return false
        if (todayOHLCV.bodyTop < yesterdayOHLCV.bodyTop) return false
        if (todayOHLCV.bodyBottom > fourDaysAgoOHLCV.bodyBottom) return false
        if (todayOHLCV.L > fourDaysAgoOHLCV.O) return false
        if (!todayOHLCV.bearish) return false



        direction.bullish += 2.5;
        direction.bullish_name.push('Bullish Three Line Strike');
        return true;

    }

    // function to detect bearish three line strike 
    function detectBearishThreeLineStrike() { 
        if (ohlcv.length < 4) return false;

        

         if (!fourDaysAgoOHLCV.bearish && !threeDaysAgoOHLCV.bearish && !fourDaysAgoOHLCV.bearish) return false
         if (threeDaysAgoOHLCV.bodyTop > fourDaysAgoOHLCV.bodyTop && threeDaysAgoOHLCV.bodyBottom > fourDaysAgoOHLCV.bodyBottom) return false
         if (yesterdayOHLCV.bodyTop > threeDaysAgoOHLCV.bodyTop && yesterdayOHLCV.bodyBottom > threeDaysAgoOHLCV.bodyBottom) return false
         if (todayOHLCV.bodyTop > yesterdayOHLCV.bodyTop) return false
         if (todayOHLCV.bodyBottom > fourDaysAgoOHLCV.bodyBottom) return false
         if (todayOHLCV.H <  fourDaysAgoOHLCV.O) return false
         if (!todayOHLCV.bullish) return false
 
 
 
         direction.bearish += 2.5;
         direction.bearish_name.push('Bearish Three Line Strike');
         return true;
    }


    // Function to detect Morning Doji Star
    function detectMorningDojiStar() { 

        if (ohlcv.length < 3) return false;

        if (!threeDaysAgoOHLCV.bearish) return false
        if (!detectDoji(yesterdayOHLCV)) return false
        if (!todayOHLCV.bullish) return false
        if (todayOHLCV.C < (threeDaysAgoOHLCV.bodyBottom + (0.5 * threeDaysAgoOHLCV.body))) return false

        direction.bullish += 1;
        direction.bullish_name.push(' Morning Doji Star');
        return true;
    }

    // Function to detect Evening doji star
    function detectEveningDojiStar() {

        if (ohlcv.length < 3) return false;

        if (!threeDaysAgoOHLCV.bullish) return false
        if (!detectDoji(yesterdayOHLCV)) return false
        if (!todayOHLCV.bearish) return false
        if (todayOHLCV.C > (threeDaysAgoOHLCV.bodyBottom + (0.5 * threeDaysAgoOHLCV.body))) return false

        direction.bearish += 1;
        direction.bearish_name.push('Evening Doji Star');
        return true;
    }

    // function to detect morning star 
    function detectMorningStar() {

        if (ohlcv.length < 3) return false;

        if (!threeDaysAgoOHLCV.bearish) return false
        if (yesterdayOHLCV.body > (0.3 * threeDaysAgoOHLCV.body)) return false
        if (!todayOHLCV.bullish) return false
        if (todayOHLCV.C < (threeDaysAgoOHLCV.bodyBottom + (0.5 * threeDaysAgoOHLCV.body))) return false

        direction.bullish += 2;
        direction.bullish_name.push(' Morning Star');
        return true;
    }

    // function to detect evening star 
    function detectEveningStar() {
        if (ohlcv.length < 3) return false;

        if (!threeDaysAgoOHLCV.bullish) return false
        if (yesterdayOHLCV.body > (0.3 * threeDaysAgoOHLCV.body)) return false
        if (!todayOHLCV.bearish) return false
        if (todayOHLCV.C > (threeDaysAgoOHLCV.bodyBottom + (0.5 * threeDaysAgoOHLCV.body))) return false

        direction.bearish += 2;
        direction.bearish_name.push('Evening Star');
        return true;
    }

    // function to detect bullish tweezer tops 
    function detectBullishTweezerTops() {
        if (ohlcv.length < 2) return false;

        if (fourDaysAgoOHLCV.bodyTop < yesterdayOHLCV.bodyBottom) return false
        if (!yesterdayOHLCV.bearish) return false
        if (!todayOHLCV.bullish) return false
        if ((yesterdayOHLCV.bodyBottom != todayOHLCV.bodyBottom)|| (yesterdayOHLCV.L != todayOHLCV.L)) return false
        if (todayOHLCV.body < yesterdayOHLCV.body) return false

        direction.bullish += 1.5;
        direction.bullish_name.push('Bullish tweezer tops');

        return true;
    }

    // fuction to detect bearish tweezer tops 
    function detectBearishTweezerTops() {
        if (ohlcv.length < 2) return false;

        if (fourDaysAgoOHLCV.bodyBottom > yesterdayOHLCV.bodyTop) return false
        if (!yesterdayOHLCV.bullish) return false
        if (!todayOHLCV.bearish) return false
        if ((yesterdayOHLCV.bodyTop != todayOHLCV.bodytop)|| (yesterdayOHLCV.H != todayOHLCV.H)) return false
        if (todayOHLCV.body < yesterdayOHLCV.body) return false

        direction.bearish += 1.5;
        direction.bearish_name.push('Bearish     tweezer tops');
        
        return true;
    }


    detectBullishEngulfing()
    detectBearishEngulfing()
    detectHammer()
    detectShootingStar()
    detectMorningStar()
    detectEveningStar()
    detectHangingMan()
    detectInvertedHammer()
    detectThreeWhiteSoldiers()
    detectThreeBlackCrows()
    detectDarkCloudCover()  
    detectPiercingPattern()
    detectBullishHarami()
    detectBearishHarami()
    detectBullishHaramiCross()
    detectBearishHaramiCross()
    detectMorningDojiStar()
    detectEveningDojiStar()
    detectBullishBeltHold()
    detectBearishBeltHold()
    detectBullishKicker()
    detectBearishKicker()
    detectBullishAbandonedBaby()
    detectBearishAbandonedBaby()
    detectBullishMarubozu()
    detectBearishMarubozu()
    detectBullishTriStar()
    detectBearishTriStar()
    detectBullishThreeLineStrike()
    detectBearishThreeLineStrike()
    detectBullishSideBySideWhiteLines()
    detectBearishSideBySideBlackLines()
    detectBullishTweezerTops()
    detectBearishTweezerTops()

    return direction

}


    




module.exports = {analyseCandlesticks}