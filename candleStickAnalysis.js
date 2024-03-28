
function analyseCandlesticks(historicalData) {

    let direction = {
        bullish: 0,
        bullish_name: [],
        bearish: 0,
        bearish_name: []
    }
    let ohlcv = historicalData


    


    //Function to detect Bullish engulfing pattern
    function detectBullishEngulfing() {
        
        if (ohlcv.length < 2) return false; // Need at least two candles for this pattern
    
        // Check if the current candle is bullish and the previous candle is bearish
        if (ohlcv[ohlcv.length - 1][1] > ohlcv[ohlcv.length - 1][4] && ohlcv[ohlcv.length - 2][4] > ohlcv[ohlcv.length - 2][1]) {
            // Check if the body of the bullish candle completely engulfs the body of the previous bearish candle
            if (ohlcv[ohlcv.length - 1][1] < ohlcv[ohlcv.length - 2][4] && ohlcv[ohlcv.length - 1][4] > ohlcv[ohlcv.length - 2][1]) {
                direction.bullish = direction.bullish + 1.5
                direction.bullish_name.push('bullish engulfing')
                return true;
            } 
        } 
        return false;
        
    }

    // Function to detect Bearish Engulfing Pattern
    function detectBearishEngulfing() {
         if (ohlcv.length < 2) return false; // Need at least two candles for this pattern

        // Check if the current candle is bearish and the previous candle is bullish
        if (ohlcv[ohlcv.length - 1][1] < ohlcv[ohlcv.length - 1][4] && ohlcv[ohlcv.length - 2][4] < ohlcv[ohlcv.length - 2][1]) {
            // Check if the body of the bearish candle completely engulfs the body of the previous bullish candle
            if (ohlcv[ohlcv.length - 1][1] > ohlcv[ohlcv.length - 2][4] && ohlcv[ohlcv.length - 1][4] < ohlcv[ohlcv.length - 2][1]) {
                direction.bearish = direction.bearish + 1.5
                direction.bearish_name.push('bearing engulfing')
                return true;
            }
        }
        return false;
    }

    // Function to detect Hammer

    function detectHammer() {
        // Hammer is a single candle pattern, so we only need to check the last candle
        const currentCandle = ohlcv[ohlcv.length - 1];

        // Conditions for a Hammer
        const bodyLength = Math.abs(currentCandle[1] - currentCandle[4]);
        const upperShadowLength = currentCandle[2] - Math.max(currentCandle[1], currentCandle[4]);
        const lowerShadowLength = Math.min(currentCandle[1], currentCandle[4]) - currentCandle[3];

        if (bodyLength < upperShadowLength * 2 && lowerShadowLength >= bodyLength * 2) {
            
            direction.bullish = direction.bullish + 1
            direction.bullish_name.push('hammer')
            return true;
        }
        return false;
    }

    // Function to detect Inverted Hammer (Bullish)
    function detectInvertedHammer() {
        // Inverted Hammer is a single candle pattern, so we only need to check the last candle
        const currentCandle = ohlcv[ohlcv.length - 1];

        // Conditions for an Inverted Hammer
        const bodyLength = Math.abs(currentCandle[1] - currentCandle[4]);
        const upperShadowLength = currentCandle[2] - Math.max(currentCandle[1], currentCandle[4]);
        const lowerShadowLength = Math.min(currentCandle[1], currentCandle[4]) - currentCandle[3];

        if (bodyLength < lowerShadowLength * 2 && upperShadowLength >= bodyLength * 2) {
            // Bullish Inverted Hammer pattern
            direction.bullish = direction.bullish + 1
            direction.bullish_name.push('inverted hammer')
            return true;
        }
        return false;
    }

    // Function to detect Shooting Star

    function detectShootingStar() {
        // Shooting Star is a single candle pattern, so we only need to check the last candle
        const currentCandle = ohlcv[ohlcv.length - 1];

        // Conditions for a Shooting Star
        const bodyLength = Math.abs(currentCandle[1] - currentCandle[4]);
        const upperShadowLength = currentCandle[2] - Math.max(currentCandle[1], currentCandle[4]);
        const lowerShadowLength = Math.min(currentCandle[1], currentCandle[4]) - currentCandle[3];

        if (bodyLength < lowerShadowLength * 2 && upperShadowLength >= bodyLength * 2) {
            direction.bearish = direction.bearish + 1
            direction.bearish_name.push('shooting star')
            return true;
        }
        return false;
    }

    // Function to detect Doji
    function detectDoji() {
        // Doji is a single candle pattern, so we only need to check the last candle
        const currentCandle = ohlcv[ohlcv.length - 1];

        // Conditions for a Doji
        const bodyLength = Math.abs(currentCandle[1] - currentCandle[4]);
        const totalRange = currentCandle[2] - currentCandle[3];

        if (bodyLength <= totalRange * 0.1) {
            return true;
        }
        return false;
    }

    // Function to detect Morning star
    function detectMorningStar() {
        if (ohlcv.length < 3) return false; // Need at least three candles for this pattern
    
        // Conditions for a Morning Star
        const prevCandle = ohlcv[ohlcv.length - 3];
        const currentCandle = ohlcv[ohlcv.length - 2];
        const nextCandle = ohlcv[ohlcv.length - 1];
    
        // Check if the previous candle is bearish, the current candle has a small body with a gap down, and the next candle is bullish with a gap up
        if (prevCandle[1] > prevCandle[4] && currentCandle[1] > currentCandle[4] && nextCandle[1] < nextCandle[4] &&
            nextCandle[1] > currentCandle[4] && nextCandle[4] > currentCandle[4] && nextCandle[1] < prevCandle[4]) {
            direction.bullish = direction.bullish + 2 
            direction.bullish_name.push('Morning Star')
            return true;
        }
        return false;
    }

    // Function to detect Evening Star
    function detectEveningStar() {
        if (ohlcv.length < 3) return false; // Need at least three candles for this pattern

        // Conditions for an Evening Star
        const prevCandle = ohlcv[ohlcv.length - 3];
        const currentCandle = ohlcv[ohlcv.length - 2];
        const nextCandle = ohlcv[ohlcv.length - 1];

        // Check if the previous candle is bullish, the current candle has a small body with a gap up, and the next candle is bearish with a gap down
        if (prevCandle[4] > prevCandle[1] && currentCandle[4] > currentCandle[1] && nextCandle[4] < nextCandle[1] &&
            nextCandle[1] > currentCandle[4] && nextCandle[4] < currentCandle[4] && nextCandle[1] > prevCandle[4]) {
            direction.bearish = direction.bearish + 2
            direction.bearish_name.push('Evening star')
            return true;
        }
        return false;
    }

    // Function to detect Hanging Man (Bearish)
    function detectHangingMan() {
        // Hanging Man is a single candle pattern, so we only need to check the last candle
        const currentCandle = ohlcv[ohlcv.length - 1];

        // Conditions for a Hanging Man
        const bodyLength = Math.abs(currentCandle[1] - currentCandle[4]);
        const upperShadowLength = currentCandle[2] - Math.max(currentCandle[1], currentCandle[4]);
        const lowerShadowLength = Math.min(currentCandle[1], currentCandle[4]) - currentCandle[3];

        if (bodyLength < upperShadowLength * 2 && lowerShadowLength >= bodyLength * 2) {
            // Bearish Hanging Man pattern
            direction.bearish = direction.bearish + 1
            direction.bearish_name.push('Hanging man')
            return true;
        }
        return false;
    }

    //Function to detect Three White Soldiers
    function detectThreeWhiteSoldiers() {
        if (ohlcv.length < 3) return false; // Need at least three candles for this pattern
    
        // Conditions for Three White Soldiers
        const prevCandle = ohlcv[ohlcv.length - 3];
        const currentCandle = ohlcv[ohlcv.length - 2];
        const nextCandle = ohlcv[ohlcv.length - 1];
    
        // Check if the previous three candles are bullish and each candle closes higher than the previous one
        if (prevCandle[4] < prevCandle[1] && currentCandle[4] < currentCandle[1] && nextCandle[4] < nextCandle[1] &&
            currentCandle[4] > prevCandle[4] && nextCandle[4] > currentCandle[4]) {
            // Bullish Three White Soldiers pattern
            direction.bullish = direction.bullish + 2
            direction.bullish_name.push('ThreeWhiteSoldiers')
            return true;
        }
        return false;
    }

    // Function to detect Three Black Crows (Bearish)
    function detectThreeBlackCrows() {
        if (ohlcv.length < 3) return false; // Need at least three candles for this pattern

        // Conditions for Three Black Crows
        const prevCandle = ohlcv[ohlcv.length - 3];
        const currentCandle = ohlcv[ohlcv.length - 2];
        const nextCandle = ohlcv[ohlcv.length - 1];

        // Check if the previous three candles are bearish and each candle closes lower than the previous one
        if (prevCandle[4] > prevCandle[1] && currentCandle[4] > currentCandle[1] && nextCandle[4] > nextCandle[1] &&
            currentCandle[4] < prevCandle[4] && nextCandle[4] < currentCandle[4]) {
            // Bearish Three Black Crows pattern
            direction.bearish = direction.bearish_name + 2
            direction.bearish_name.push('three black crows')
            return true;
        }
        return false;
    }

    // Function to detect Piercing Pattern (Bullish)
    function detectPiercingPattern() {
        if (ohlcv.length < 2) return false; // Need at least two candles for this pattern
    
        // Conditions for a Piercing Pattern
        const prevCandle = ohlcv[ohlcv.length - 2];
        const currentCandle = ohlcv[ohlcv.length - 1];
        const prevBodyRange = Math.abs(prevCandle[1] - prevCandle[4]);
        const currentBodyRange = Math.abs(currentCandle[1] - currentCandle[4]);
    
        if (prevCandle[4] < prevCandle[1] && // Previous candle is bearish
            currentCandle[4] > currentCandle[1] && // Current candle is bullish
            currentCandle[4] > prevCandle[3] + (prevBodyRange * 0.5) && // Current candle closes above the midpoint of the previous candle
            currentCandle[1] < prevCandle[4] // Current candle opens below the previous candle's close
        ) {
            // Bullish Piercing Pattern pattern
            direction.bullish = direction.bullish + 1.5
            direction.bullish_name.push('piercing pattern')
            return true;
        }
        return false;
    }

    // Function to detect Dark Cloud Cover (Bearish)
    function detectDarkCloudCover() {
        if (ohlcv.length < 2) return false; // Need at least two candles for this pattern

        // Conditions for a Dark Cloud Cover
        const prevCandle = ohlcv[ohlcv.length - 2];
        const currentCandle = ohlcv[ohlcv.length - 1];
        const prevBodyRange = Math.abs(prevCandle[1] - prevCandle[4]);
        const currentBodyRange = Math.abs(currentCandle[1] - currentCandle[4]);

        if (prevCandle[4] > prevCandle[1] && // Previous candle is bullish
            currentCandle[4] < currentCandle[1] && // Current candle is bearish
            currentCandle[4] < prevCandle[3] - (prevBodyRange * 0.5) && // Current candle closes below the midpoint of the previous candle
            currentCandle[1] > prevCandle[4] // Current candle opens above the previous candle's close
        ) {
            // Bearish Dark Cloud Cover pattern
            direction.bearish = direction.bearish + 1.5
            direction.bearish_name.push('dark cloud cover')
            return true;
        }
        return false;
    }

    // Function to detect Bullish Harami (Bullish)
    function detectBullishHarami() {
        if (ohlcv.length < 2) return false; // Need at least two candles for this pattern

        // Conditions for a Bullish Harami
        const prevCandle = ohlcv[ohlcv.length - 2];
        const currentCandle = ohlcv[ohlcv.length - 1];
        const prevBodyRange = Math.abs(prevCandle[1] - prevCandle[4]);

        if (prevCandle[4] > prevCandle[1] && // Previous candle is bullish
            currentCandle[4] < currentCandle[1] && // Current candle is bearish
            currentCandle[4] > prevCandle[4] && // Current candle closes within the range of the previous candle
            currentCandle[1] < prevCandle[1] // Current candle opens below the previous candle's open
        ) {
            // Bullish Harami pattern
            direction.bullish = direction.bullish + 1.5
            direction.bullish_name.push('Bullish Harami')
            return true;
        }
        return false;
    }

    //Function to detect Bearish Harami
    function detectBearishHarami() {
        if (ohlcv.length < 2) return false; // Need at least two candles for this pattern
    
        // Conditions for a Bearish Harami
        const prevCandle = ohlcv[ohlcv.length - 2];
        const currentCandle = ohlcv[ohlcv.length - 1];
        const prevBodyRange = Math.abs(prevCandle[1] - prevCandle[4]);
    
        if (prevCandle[4] < prevCandle[1] && // Previous candle is bearish
            currentCandle[4] > currentCandle[1] && // Current candle is bullish
            currentCandle[4] < prevCandle[4] && // Current candle closes within the range of the previous candle
            currentCandle[1] > prevCandle[1] // Current candle opens above the previous candle's open
        ) {
            // Bearish Harami pattern
            direction.bearish = direction.bearish + 1.5
            direction.bearish_name.push('Bearish Harami')
            return true;
        }
        return false;
    }

    // Function to detect Bullish Harami Cross (Bullish)
    function detectBullishHaramiCross() {
        if (ohlcv.length < 2) return false; // Need at least two candles for this pattern

        // Conditions for a Bullish Harami Cross
        const prevCandle = ohlcv[ohlcv.length - 2];
        const currentCandle = ohlcv[ohlcv.length - 1];
        const prevBodyRange = Math.abs(prevCandle[1] - prevCandle[4]);

        if (prevCandle[4] > prevCandle[1] && // Previous candle is bullish
            currentCandle[4] < currentCandle[1] && // Current candle is bearish
            currentCandle[1] < prevCandle[4] && currentCandle[1] > prevCandle[3] &&
            currentCandle[4] > prevCandle[1] && currentCandle[4] < prevCandle[4] // Current candle opens below and closes inside previous candle's body
        ) {
            // Bullish Harami Cross pattern
            direction.bullish = direction.bullish + 1.5
            direction.bullish_name.push('Bullish Harami Cross')
            return true;
        }
        return false;
    }

    // Function to detect Bearish Harami Cross (Bearish)
    function detectBearishHaramiCross() {
        if (ohlcv.length < 2) return false; // Need at least two candles for this pattern

        // Conditions for a Bearish Harami Cross
        const prevCandle = ohlcv[ohlcv.length - 2];
        const currentCandle = ohlcv[ohlcv.length - 1];
        const prevBodyRange = Math.abs(prevCandle[1] - prevCandle[4]);

        if (prevCandle[4] < prevCandle[1] && // Previous candle is bearish
            currentCandle[4] > currentCandle[1] && // Current candle is bullish
            currentCandle[1] > prevCandle[4] && currentCandle[1] < prevCandle[3] &&
            currentCandle[4] < prevCandle[1] && currentCandle[4] > prevCandle[4] // Current candle opens above and closes inside previous candle's body
        ) {
            // Bearish Harami Cross pattern
            direction.bearish = direction.bearish + 1.5
            direction.bearish_name.push('Bearish Harami')
            return true;
        }
        return false;
    }

    // Function to detect Morning Doji Star (Bullish)
    function detectMorningDojiStar() {
        if (ohlcv.length < 3) return false; // Need at least three candles for this pattern

        // Conditions for a Morning Doji Star
        const prevCandle = ohlcv[ohlcv.length - 3];
        const currentCandle = ohlcv[ohlcv.length - 2];
        const nextCandle = ohlcv[ohlcv.length - 1];
        const currentBodyRange = Math.abs(currentCandle[1] - currentCandle[4]);

        if (prevCandle[4] > prevCandle[1] && // Previous candle is bullish
            currentCandle[1] < currentCandle[4] && // Current candle is bullish
            nextCandle[4] > nextCandle[1] && // Next candle is bullish
            currentCandle[4] < prevCandle[1] && // Current candle opens below previous candle's close
            Math.abs(currentCandle[1] - currentCandle[4]) <= currentBodyRange * 0.1 // Current candle is a doji
        ) {
            // Bullish Morning Doji Star pattern
            direction.bullish = direction.bullish + 2
            direction.bullish_name.push('Morning Doji Star')

            return true;
        }
        return false;
    }

    // Function to detect Evening Doji Star (Bearish)
    function detectEveningDojiStar() {
        if (ohlcv.length < 3) return false; // Need at least three candles for this pattern

        // Conditions for an Evening Doji Star
        const prevCandle = ohlcv[ohlcv.length - 3];
        const currentCandle = ohlcv[ohlcv.length - 2];
        const nextCandle = ohlcv[ohlcv.length - 1];
        const currentBodyRange = Math.abs(currentCandle[1] - currentCandle[4]);

        if (prevCandle[4] < prevCandle[1] && // Previous candle is bearish
            currentCandle[1] > currentCandle[4] && // Current candle is bearish
            nextCandle[4] < nextCandle[1] && // Next candle is bearish
            currentCandle[4] > prevCandle[1] && // Current candle opens above previous candle's close
            Math.abs(currentCandle[1] - currentCandle[4]) <= currentBodyRange * 0.1 // Current candle is a doji
        ) {
            // Bearish Evening Doji Star pattern
            direction.bearish = direction.bearish + 2
            direction.bearish_name.push('Evening Doji Star')
            return true;
        }
        return false;
    }

    function detectBullishBeltHold() {
        // Bullish Belt Hold is a single candle pattern, so we only need to check the last candle
        const currentCandle = ohlcv[ohlcv.length - 1];
    
        // Conditions for a Bullish Belt Hold
        const bodyLength = Math.abs(currentCandle[1] - currentCandle[4]);
        const upperShadowLength = currentCandle[2] - Math.max(currentCandle[1], currentCandle[4]);
        const lowerShadowLength = Math.min(currentCandle[1], currentCandle[4]) - currentCandle[3];
    
        if (currentCandle[4] > currentCandle[1] && // Current candle is bullish
            lowerShadowLength < bodyLength * 0.1 && // Lower shadow is small
            upperShadowLength === 0 // No upper shadow
        ) {
            // Bullish Belt Hold pattern
            direction.bullish = direction.bullish + 1
            direction.bullish_name.push('Bullish Belt hold')
            return true;
        }
        return false;
    }

    // Function to detect Bearish Belt Hold (Bearish)
    function detectBearishBeltHold() {
        // Bearish Belt Hold is a single candle pattern, so we only need to check the last candle
        const currentCandle = ohlcv[ohlcv.length - 1];

        // Conditions for a Bearish Belt Hold
        const bodyLength = Math.abs(currentCandle[1] - currentCandle[4]);
        const upperShadowLength = currentCandle[2] - Math.max(currentCandle[1], currentCandle[4]);
        const lowerShadowLength = Math.min(currentCandle[1], currentCandle[4]) - currentCandle[3];

        if (currentCandle[4] < currentCandle[1] && // Current candle is bearish
            upperShadowLength < bodyLength * 0.1 && // Upper shadow is small
            lowerShadowLength === 0 // No lower shadow
        ) {
            // Bearish Belt Hold pattern
            direction.bearish = direction.bearish + 1
            direction.bearish_name.push('Bearish Belt Hold')
            return true;
        }
        return false;
    }

    // Function to detect Bullish Kicker (Bullish)
    function detectBullishKicker() {
        if (ohlcv.length < 2) return false; // Need at least two candles for this pattern

        // Conditions for a Bullish Kicker
        const prevCandle = ohlcv[ohlcv.length - 2];
        const currentCandle = ohlcv[ohlcv.length - 1];

        if (prevCandle[4] > prevCandle[1] && // Previous candle is bullish
            currentCandle[4] < currentCandle[1] && // Current candle is bearish
            currentCandle[1] < prevCandle[4] && currentCandle[4] < prevCandle[1] // Current candle opens and closes below previous candle's body
        ) {
            // Bullish Kicker pattern
            direction.bullish = direction.bullish + 1.5
            direction.bullish_name.push('Bullish Kicker')
            return true;
        }
        return false;
    }

    // Function to detect Bearish Kicker (Bearish)
    function detectBearishKicker() {
        if (ohlcv.length < 2) return false; // Need at least two candles for this pattern

        // Conditions for a Bearish Kicker
        const prevCandle = ohlcv[ohlcv.length - 2];
        const currentCandle = ohlcv[ohlcv.length - 1];

        if (prevCandle[4] < prevCandle[1] && // Previous candle is bearish
            currentCandle[4] > currentCandle[1] && // Current candle is bullish
            currentCandle[1] > prevCandle[4] && currentCandle[4] > prevCandle[1] // Current candle opens and closes above previous candle's body
        ) {
            // Bearish Kicker pattern
            direction.bearish = direction.bearish + 1.5
            direction.bearish_name.push('Bearish Kicker')
            return true;
        }
        return false;
    }
    
    // Function to detect Bullish Abandoned Baby (Bullish)
    function detectBullishAbandonedBaby() {
        if (ohlcv.length < 3) return false; // Need at least three candles for this pattern

        // Conditions for a Bullish Abandoned Baby
        const firstCandle = ohlcv[ohlcv.length - 3];
        const secondCandle = ohlcv[ohlcv.length - 2];
        const thirdCandle = ohlcv[ohlcv.length - 1];

        if (
            firstCandle[4] > firstCandle[1] && // First candle is bullish
            Math.abs(firstCandle[1] - firstCandle[4]) > (firstCandle[2] - firstCandle[3]) * 0.5 && // Large body in first candle
            secondCandle[4] > secondCandle[1] && // Second candle is bullish
            Math.abs(secondCandle[1] - secondCandle[4]) < (secondCandle[2] - secondCandle[3]) * 0.1 && // Small body in second candle
            thirdCandle[1] < secondCandle[4] && thirdCandle[4] > secondCandle[4] && // Third candle gaps up and closes above second candle's high
            thirdCandle[1] > secondCandle[1] // Third candle opens above second candle's close
        ) {
            // Bullish Abandoned Baby pattern
            direction.bullish = direction.bullish + 2
            direction.bullish_name.push('Bullish Abandoned Baby')
            return true;
        }
        return false;
    }


    // Function to detect Bearish Abandoned Baby (Bearish)
    function detectBearishAbandonedBaby() {
        if (ohlcv.length < 3) return false; // Need at least three candles for this pattern

        // Conditions for a Bearish Abandoned Baby
        const firstCandle = ohlcv[ohlcv.length - 3];
        const secondCandle = ohlcv[ohlcv.length - 2];
        const thirdCandle = ohlcv[ohlcv.length - 1];

        if (
            firstCandle[4] < firstCandle[1] && // First candle is bearish
            Math.abs(firstCandle[1] - firstCandle[4]) > (firstCandle[2] - firstCandle[3]) * 0.5 && // Large body in first candle
            secondCandle[4] < secondCandle[1] && // Second candle is bearish
            Math.abs(secondCandle[1] - secondCandle[4]) < (secondCandle[2] - secondCandle[3]) * 0.1 && // Small body in second candle
            thirdCandle[1] > secondCandle[4] && thirdCandle[4] < secondCandle[4] && // Third candle gaps down and closes below second candle's low
            thirdCandle[1] < secondCandle[1] // Third candle opens below second candle's close
        ) {
            // Bearish Abandoned Baby pattern
            direction.bearish = direction.bearish + 2
            direction.bearish_name.push('Bearish Abandoned Baby')
            return true;
        }
        return false;
    }

    // Function to detect Bullish Marubozu (Bullish)
    function detectBullishMarubozu() {
        // Bullish Marubozu is a single candle pattern, so we only need to check the last candle
        const currentCandle = ohlcv[ohlcv.length - 1];

        // Conditions for a Bullish Marubozu
        const bodyRange = Math.abs(currentCandle[1] - currentCandle[4]);

        if (
            currentCandle[1] === currentCandle[3] && // Open equals low
            currentCandle[4] === currentCandle[2] && // Close equals high
            currentCandle[4] > currentCandle[1] // Close is higher than open
        ) {
            // Bullish Marubozu pattern
            direction.bullish = direction.bullish + 1
            direction.bullish_name.push('Bullish Marubozu')
            return true;
        }
        return false;
    }

    // Function to detect Bearish Marubozu (Bearish)
    function detectBearishMarubozu() {
        // Bearish Marubozu is a single candle pattern, so we only need to check the last candle
        const currentCandle = ohlcv[ohlcv.length - 1];

        // Conditions for a Bearish Marubozu
        const bodyRange = Math.abs(currentCandle[1] - currentCandle[4]);

        if (
            currentCandle[1] === currentCandle[2] && // Open equals high
            currentCandle[4] === currentCandle[3] && // Close equals low
            currentCandle[4] < currentCandle[1] // Close is lower than open
        ) {
            // Bearish Marubozu pattern
            direction.bearish = direction.bearish + 1
            direction.bearish_name.push('Bearish Marubozu')
            return true;
        }
        return false;
    }

    // Function to detect Bullish Tri-Star (Bullish)
    function detectBullishTriStar() {
        if (ohlcv.length < 4) return false; // Need at least four candles for this pattern

        // Conditions for a Bullish Tri-Star
        const firstCandle = ohlcv[ohlcv.length - 4];
        const secondCandle = ohlcv[ohlcv.length - 3];
        const thirdCandle = ohlcv[ohlcv.length - 2];
        const fourthCandle = ohlcv[ohlcv.length - 1];

        if (
            Math.abs(secondCandle[1] - secondCandle[4]) <= (secondCandle[2] - secondCandle[3]) * 0.1 && // Second candle is a doji
            Math.abs(thirdCandle[1] - thirdCandle[4]) <= (thirdCandle[2] - thirdCandle[3]) * 0.1 && // Third candle is a doji
            Math.abs(fourthCandle[1] - fourthCandle[4]) <= (fourthCandle[2] - fourthCandle[3]) * 0.1 && // Fourth candle is a doji
            secondCandle[4] > firstCandle[4] && thirdCandle[4] > secondCandle[4] && // Gap up between each candle
            fourthCandle[4] > thirdCandle[4] // Fourth candle closes higher than third candle
        ) {
            // Bullish Tri-Star pattern
            direction.bullish = direction.bullish + 2.5
            direction.bullish_name.push('Bullish Tri-star')
            return true;
        }
        return false;
    }

    // Function to detect Bearish Tri-Star (Bearish)
    function detectBearishTriStar() {
        if (ohlcv.length < 4) return false; // Need at least four candles for this pattern

        // Conditions for a Bearish Tri-Star
        const firstCandle = ohlcv[ohlcv.length - 4];
        const secondCandle = ohlcv[ohlcv.length - 3];
        const thirdCandle = ohlcv[ohlcv.length - 2];
        const fourthCandle = ohlcv[ohlcv.length - 1];

        if (
            Math.abs(secondCandle[1] - secondCandle[4]) <= (secondCandle[2] - secondCandle[3]) * 0.1 && // Second candle is a doji
            Math.abs(thirdCandle[1] - thirdCandle[4]) <= (thirdCandle[2] - thirdCandle[3]) * 0.1 && // Third candle is a doji
            Math.abs(fourthCandle[1] - fourthCandle[4]) <= (fourthCandle[2] - fourthCandle[3]) * 0.1 && // Fourth candle is a doji
            secondCandle[4] < firstCandle[4] && thirdCandle[4] < secondCandle[4] && // Gap down between each candle
            fourthCandle[4] < thirdCandle[4] // Fourth candle closes lower than third candle
        ) {
            // Bearish Tri-Star pattern
            direction.bearish = direction.bearish + 2.5
            direction.bearish_name.push('Bearish Tri-star')
            return true;
        }
        return false;
    }

    // Function to detect Bullish Three-Line Strike (Bullish)
    function detectBullishThreeLineStrike() {
        if (ohlcv.length < 4) return false; // Need at least four candles for this pattern

        // Conditions for a Bullish Three-Line Strike
        const firstCandle = ohlcv[ohlcv.length - 4];
        const secondCandle = ohlcv[ohlcv.length - 3];
        const thirdCandle = ohlcv[ohlcv.length - 2];
        const fourthCandle = ohlcv[ohlcv.length - 1];

        if (
            firstCandle[4] > firstCandle[1] && secondCandle[4] > secondCandle[1] && // First two candles are bullish
            thirdCandle[4] > thirdCandle[1] && // Third candle is bullish
            fourthCandle[1] < thirdCandle[4] && fourthCandle[4] > firstCandle[4] // Fourth candle engulfs first three candles
        ) {
            // Bullish Three-Line Strike pattern
            direction.bullish = direction.bullish + 2.5
            direction.bullish_name.push('Bullish Three-line strike')
            return true;
        }
        return false;
    }

    // Function to detect Bearish Three-Line Strike (Bearish)
    function detectBearishThreeLineStrike() {
        if (ohlcv.length < 4) return false; // Need at least four candles for this pattern

        // Conditions for a Bearish Three-Line Strike
        const firstCandle = ohlcv[ohlcv.length - 4];
        const secondCandle = ohlcv[ohlcv.length - 3];
        const thirdCandle = ohlcv[ohlcv.length - 2];
        const fourthCandle = ohlcv[ohlcv.length - 1];

        if (
            firstCandle[4] < firstCandle[1] && secondCandle[4] < secondCandle[1] && // First two candles are bearish
            thirdCandle[4] < thirdCandle[1] && // Third candle is bearish
            fourthCandle[1] > thirdCandle[4] && fourthCandle[4] < firstCandle[4] // Fourth candle engulfs first three candles
        ) {
            // Bearish Three-Line Strike pattern
            direction.bearish = direction.bearish + 2.5
            direction.bearish_name.push('Bearish Three-line strike')
            return true;
        }
        return false;
    }

    // Function to detect Bullish Side-by-Side White Lines (Bullish)
    function detectBullishSideBySideWhiteLines() {
        if (ohlcv.length < 2) return false; // Need at least two candles for this pattern

        // Conditions for Bullish Side-by-Side White Lines
        const firstCandle = ohlcv[ohlcv.length - 2];
        const secondCandle = ohlcv[ohlcv.length - 1];

        if (
            firstCandle[4] > firstCandle[1] && secondCandle[4] > secondCandle[1] && // Both candles are bullish
            secondCandle[1] === firstCandle[1] && secondCandle[4] > firstCandle[4] // Second candle opens at the same level as first candle but closes higher
        ) {
            // Bullish Side-by-Side White Lines pattern
            direction.bullish = direction.bullish + 1.5
            direction.bullish_name.push('Bearish Side-by-side white lines')
            return true;
        }
        return false;
    }

    // Function to detect Bearish Side-by-Side Black Lines (Bearish)
    function detectBearishSideBySideBlackLines() {
        if (ohlcv.length < 2) return false; // Need at least two candles for this pattern

        // Conditions for Bearish Side-by-Side Black Lines
        const firstCandle = ohlcv[ohlcv.length - 2];
        const secondCandle = ohlcv[ohlcv.length - 1];

        if (
            firstCandle[4] < firstCandle[1] && secondCandle[4] < secondCandle[1] && // Both candles are bearish
            secondCandle[1] === firstCandle[1] && secondCandle[4] < firstCandle[4] // Second candle opens at the same level as first candle but closes lower
        ) {
            // Bearish Side-by-Side Black Lines pattern
            direction.bearish = direction.bearish + 1.5
            direction.bearish_name.push('Bearish Side-by-side Black Lines')
            return true;
        }
        return false;
    }

    // Function to detect Bullish Tweezer Tops (Bullish)
    function detectBullishTweezerTops() {
        if (ohlcv.length < 3) return false; // Need at least three candles for this pattern

        // Conditions for Bullish Tweezer Tops
        const firstCandle = ohlcv[ohlcv.length - 3];
        const secondCandle = ohlcv[ohlcv.length - 2];
        const thirdCandle = ohlcv[ohlcv.length - 1];

        if (
            secondCandle[1] === thirdCandle[1] && // Second candle has the same high as the third candle
            firstCandle[1] < secondCandle[1] && // First candle's high is lower than the second candle's high
            firstCandle[4] > secondCandle[4] // First candle's close is higher than the second candle's close
        ) {
            // Bullish Tweezer Tops pattern
            direction.bullish = direction.bullish + 2
            direction.bullish_name.push('Bullish Tweezer Tops')
            return true;
        }
        return false;
    }

    // Function to detect Bearish Tweezer Tops (Bearish)
    function detectBearishTweezerTops() {
        if (ohlcv.length < 3) return false; // Need at least three candles for this pattern

        // Conditions for Bearish Tweezer Tops
        const firstCandle = ohlcv[ohlcv.length - 3];
        const secondCandle = ohlcv[ohlcv.length - 2];
        const thirdCandle = ohlcv[ohlcv.length - 1];

        if (
            secondCandle[1] === thirdCandle[1] && // Second candle has the same high as the third candle
            firstCandle[1] > secondCandle[1] && // First candle's high is higher than the second candle's high
            firstCandle[4] < secondCandle[4] // First candle's close is lower than the second candle's close
        ) {
            // Bearish Tweezer Tops pattern
            direction.bearish = direction.bearish + 2
            direction.bearish_name.push('Bearish Tweezer Tops')
            return true;
        }
        return false;
    }








    detectBullishEngulfing()
    detectBearishEngulfing()
    detectHammer()
    detectShootingStar()
    detectDoji()
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


    console.log(direction);

















}













module.exports = {analyseCandlesticks}