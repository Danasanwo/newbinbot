

async function prioritizeMarkets(candleStick, indicators, price) {

    try {

        let candleStickData = await candleStick
        let indicatorsData = await indicators
        let bullishPoints = 0
        let bearishPoints = 0
        let bearbullpointer = {
            "bull": 0,
            "bear": 0,
            "neutral": 0
        }    




        // candleStick 
    
    
        bullishPoints = candleStickData.bullish * 10
        bearishPoints = candleStickData.bearish * 10

        if (bullishPoints > bearishPoints) bearbullpointer.bull += 1
        else if (bearishPoints > bullishPoints) bearbullpointer.bear += 1
        else if (bullishPoints == bearishPoints) bearbullpointer.neutral += 1
    
        // sma 
      
        function checkcrossMA(smallPeriod, largePeriod) {
            
            let yesterdayWasLower = indicators.SMA.yesterday[smallPeriod] < indicators.SMA.yesterday[largePeriod]
            let dayBeforeWasLower = indicators.SMA.daybefore[smallPeriod] < indicators.SMA.daybefore[largePeriod]
            let todayIsHigher = indicators.SMA.today[smallPeriod] > indicators.SMA.today[largePeriod]
    
            let yesterdayWasHigher = indicators.SMA.yesterday[smallPeriod] > indicators.SMA.yesterday[largePeriod]
            let dayBeforeWasHigher = indicators.SMA.daybefore[smallPeriod] > indicators.SMA.daybefore[largePeriod]
            let todayIsLower = indicators.SMA.today[smallPeriod] < indicators.SMA.today[largePeriod]
            
          
            if ( (yesterdayWasLower && todayIsHigher)|| (dayBeforeWasLower && yesterdayWasHigher) || (dayBeforeWasLower && todayIsHigher)) {
                 bullishPoints = bullishPoints + 0.5 + ((largePeriod - smallPeriod)/10)



                 
            } else if ((yesterdayWasHigher && todayIsLower)|| (dayBeforeWasHigher && yesterdayWasLower) || (dayBeforeWasHigher && todayIsLower)) {
                bearishPoints = bearishPoints + 0.5 + ((largePeriod - smallPeriod)/10)       
    

            } else {
                return false
            }
    
        }
    

    
        //vma
    
        //macd
    
        //adx
    
        if (indicatorsData.ADX.adx > 30) {
            bullishPoints += 0
            bearishPoints += 0
        } else if ( indicatorsData.ADX.adx > 25 ) {
            bullishPoints += 10
            bearishPoints += 10
        } else if ( indicatorsData.ADX.adx > 20 ) {
            bullishPoints += 5
            bearishPoints += 5
        } 


        if (indicatorsData.ADX.adx > 25 && indicatorsData.ADX.adx < 30) {
            if (indicatorsData.ADX.pdi > indicatorsData.ADX.mdi) bearbullpointer.bull += 1
            else if (indicatorsData.ADX.mdi > indicatorsData.ADX.pdi) bearbullpointer.bear += 1
        }
    

        
    
        // rsi 
        if (indicatorsData.RSI >= 90) {
            bullishPoints += 0
            bearishPoints += 30
    
        } else if ( indicatorsData.RSI >= 80 ) {
            bullishPoints += 0
            bearishPoints += 20
    
    
        } else if (  indicatorsData.RSI >= 70 ) {
            bullishPoints += 0
            bearishPoints += 8
    
        } else if ( indicatorsData.RSI > 65 ) {
            bullishPoints += 0
            bearishPoints += 5
    
        } else if ( indicatorsData.RSI > 45 && indicatorsData.RSI < 55 ) {
            bullishPoints += 2
            bearishPoints += 2
    
        } else if (  indicatorsData.RSI >= 35 ) {
            bullishPoints += 5
            bearishPoints += 0
        } else if (  indicatorsData.RSI >= 20 ) {
                bullishPoints += 8
                bearishPoints += 0
        } else if (  indicatorsData.RSI > 10 ) {
            bullishPoints += 20
            bearishPoints += 0 
            
        } else if ( indicatorsData.RSI <= 10 ) {
                bullishPoints += 30
                bearishPoints += 0
        }

        if (indicatorsData.RSI > 75) bearbullpointer.bull += 1
        if (indicatorsData.RSI > 25) bearbullpointer.bear += 1


    
    
    
        // stochoc 
    
        if (indicatorsData.StochOsc.k >= 90) {
            bullishPoints += 0
            bearishPoints += 12
    
        } else if ( indicatorsData.StochOsc.k  >= 80 ) {
            bullishPoints += 0
            bearishPoints += 9
    
        } else if (  indicatorsData.StochOsc.k  >= 70 ) {
            bullishPoints += 0
            bearishPoints += 6
    
        } else if ( indicatorsData.StochOsc.k  >55 ) {
            bullishPoints += 1
            bearishPoints += 3
    
        } else if ( indicatorsData.StochOsc.k  > 45 && indicatorsData.StochOsc.k  < 55 ) {
            bullishPoints += 1
            bearishPoints += 1
    
        } else if (  indicatorsData.StochOsc.k  >= 35 ) {
            bullishPoints += 3
            bearishPoints += 1
        } else if (  indicatorsData.StochOsc.k  >= 20 ) {
                bullishPoints += 6
                bearishPoints += 0
        } else if (  indicatorsData.StochOsc.k  > 10 ) {
            bullishPoints += 9
            bearishPoints += 0 
            
        } else if ( indicatorsData.StochOsc.k  <= 10 ) {
                bullishPoints += 9
                bearishPoints += 0
        }

        if (indicatorsData.StochOsc.k > 80) bearbullpointer.bull += 1
        if (indicatorsData.StochOsc.k > 20) bearbullpointer.bear += 1


    
        //ATR
    
    
        //BOLL
    
         function checkQuarterBoll(day) {
            let closeprice =   price[price.length - day][4]
    
            
            let abBoll = closeprice > indicatorsData.BOLL[day].upper //above bollinger band
            let ftqBoll = closeprice > ((indicatorsData.BOLL[day].upper + indicatorsData.BOLL[day].middle)/2) && closeprice < indicatorsData.BOLL[day].upper //first quarter bollinger
            let sqBoll = closeprice > indicatorsData.BOLL[day].middle && closeprice < ((indicatorsData.BOLL[day].upper + indicatorsData.BOLL[day].middle)/2)//second quarter bollinger
            let tqBoll = closeprice < indicatorsData.BOLL[day].middle  && closeprice > ((indicatorsData.BOLL[day].middle + indicatorsData.BOLL[day].lower)/2) //third quarter bollinger
            let fhqBoll = closeprice > indicatorsData.BOLL[day].lower && closeprice < ((indicatorsData.BOLL[day].middle + indicatorsData.BOLL[day].lower)/2)   //fourth quarter bollinger
            let beBoll = closeprice < indicatorsData.BOLL[day].lower //below bollinger band
        
            if (abBoll) return  'abBoll'
            if (ftqBoll) return  'ftqBoll'
            if (sqBoll) return  'sqBoll'
            if (tqBoll) return  'tqBoll'
            if (fhqBoll) return  'fhqBoll'
            if (beBoll) return  'beBoll'
    
        }


      
    //    one day Boll 
        if (checkQuarterBoll(1) =='abBoll') {
            bearishPoints = bearishPoints + 3
        }
    
        if (checkQuarterBoll(1) =='ftqBoll') {
            bearishPoints = bearishPoints + 2
    
        }
    
        if (checkQuarterBoll(1) == 'sqBoll') {
            bearishPoints = bearishPoints + 1
        }
    
        if (checkQuarterBoll(1) == 'tqBoll') {
            bullishPoints = bullishPoints + 1
    
        }
        if (checkQuarterBoll(1) == 'fhqBoll') {
            bullishPoints =  bullishPoints + 2
    
        }
        if (checkQuarterBoll(1) == 'beBoll') {
            bullishPoints = bullishPoints + 3
    
        }


    
    
    //three day Bollinger
    
        if ((checkQuarterBoll(1) == 'abBoll') && (checkQuarterBoll(2) == 'abBoll') && (checkQuarterBoll(3) == 'abBoll') ) {
            bearishPoints = bearishPoints + 8
        }
    
        if ((checkQuarterBoll(1) == 'beBoll') && (checkQuarterBoll(2) == 'beBoll') && (checkQuarterBoll(3) == 'beBoll') ) {
            bullishPoints = bullishPoints + 8
        }
    
    
    //five day bollinger
        if (
            ((checkQuarterBoll(1) == 'abBoll')|| (checkQuarterBoll(1) == 'ftqBoll') ) &&
            ((checkQuarterBoll(2) == 'abBoll')|| (checkQuarterBoll(2) == 'ftqBoll') ) &&
            ((checkQuarterBoll(3) == 'abBoll')|| (checkQuarterBoll(3) == 'ftqBoll') ) &&
            ((checkQuarterBoll(4) == 'abBoll')|| (checkQuarterBoll(4) == 'ftqBoll') ) &&
            ((checkQuarterBoll(5) == 'abBoll')|| (checkQuarterBoll(5) == 'ftqBoll') ) 
    
        ){
            bearishPoints = bearishPoints + 8
    
        }
    
        if (
            ((checkQuarterBoll(1) == 'fhqBoll')|| (checkQuarterBoll(1) == 'beBoll') ) &&
            ((checkQuarterBoll(2) == 'fhqBoll')|| (checkQuarterBoll(2) == 'beBoll') ) &&
            ((checkQuarterBoll(3) == 'fhqBoll')|| (checkQuarterBoll(3) == 'beBoll') ) &&
            ((checkQuarterBoll(4) == 'fhqBoll')|| (checkQuarterBoll(4) == 'beBoll') ) &&
            ((checkQuarterBoll(5) == 'fhqBoll')|| (checkQuarterBoll(5) == 'beBoll') ) 
          
        ){
            bullishPoints = bullishPoints + 8
        }
    
    
    
        // 8 day bollinger 
    
        function eightBoll() {
    
            let totalTopBollinEight = 0
            let totalBottomBollinEight = 0
    
            for (const day in indicatorsData.BOLL) {
                if  ((checkQuarterBoll(day) == 'abBoll')|| (checkQuarterBoll(day) == 'ftqBoll') || (checkQuarterBoll(day) == 'sqBoll') )   {
                    totalTopBollinEight = totalTopBollinEight + 1
                }
                if  ((checkQuarterBoll(day) == 'tqBoll') ||(checkQuarterBoll(day) == 'fhqBoll')|| (checkQuarterBoll(day) == 'beBoll') )   {
                    totalBottomBollinEight = totalBottomBollinEight + 1
                }
            }
            return [totalTopBollinEight, totalBottomBollinEight]
        }
           
        if (eightBoll()[0] > eightBoll[1]) {
            bearishPoints = bearishPoints + 5
        } else if (eightBoll()[1] > eightBoll[0]) {
            bullishPoints = bullishPoints + 5
        }
    


    
        //band boll
    
        function checkBollBand() {
            let checkOneBand = 0.05 * price[price.length - 1][4]
    
            let bollLength = indicatorsData.BOLL[1].upper - indicatorsData.BOLL[1].lower
    
            if (bollLength < (2 * checkOneBand)) {
                bullishPoints = bullishPoints + 0.5
                bearishPoints = bearishPoints + 0.5
            } else if (bollLength > (2 * checkOneBand) && bollLength < (4 * checkOneBand)) {
                bullishPoints = bullishPoints + 1.5
                bearishPoints = bearishPoints + 1.5
            } else if (bollLength > (4 * checkOneBand) && bollLength < (6 * checkOneBand)) {
                bullishPoints = bullishPoints + 2.5
                bearishPoints = bearishPoints + 2.5
            } else if (bollLength > (6 * checkOneBand)) {
                bullishPoints = bullishPoints + 4
                bearishPoints = bearishPoints + 4
            }
            
        }
    
        checkBollBand() 


    
    
        //VWAP
    
        // if ( price[price.length - 1][4] > indicatorsData.VWAP ) {
        //     bullishPoints = bullishPoints + 2
        // }
        // if ( price[price.length - 1][4] < indicatorsData.VWAP) {
        //     bearishPoints = bearishPoints + 2
        // }
    
        //OBV
    
    

        checkcrossMA(3, 10)
        checkcrossMA(3, 25)
        checkcrossMA(3, 50)
        checkcrossMA(3, 99)
        checkcrossMA(5, 25)
        checkcrossMA(5, 99)
        checkcrossMA(10, 25)
        checkcrossMA(10, 99)
        checkcrossMA(13, 50)
        checkcrossMA(13, 99)
        checkcrossMA(25, 50)
       
    
         // Return bullishPoints - bearishPoints
         return bullishPoints - bearishPoints;
        
    } catch (error) {
        // console.error("Error occurred");
        // Return 0 if any error occurs
        return 0;
    }
   
  

}


function combineTimePeriod(periodOne, periodTwo, periodThree, periodYesterday) {
    try {
        let totalPeriodPoints = periodOne + (4 * periodTwo) + (4 * periodThree) + (1 * periodYesterday)

        return totalPeriodPoints
    } catch (error) {
       return 0 
    }
}

function groupTimePeriod(periodOne, periodTwo, periodThree, periodFour) {
    try {
        let periodGrouper = {
            bull: 0,
            bear: 0
        }

        periodOne > 0 ? periodGrouper.bull += 1 : periodGrouper.bear += 1
        periodTwo > 0 ? periodGrouper.bull += 1 : periodGrouper.bear += 1
        periodThree > 0 ? periodGrouper.bull += 1 : periodGrouper.bear += 1
        periodFour > 0 ? periodGrouper.bull += 1 : periodGrouper.bear += 1

        return periodGrouper

    } catch (error) {
        console.log('could not find group time period');
    }
}




















module.exports = {
    prioritizeMarkets,
    combineTimePeriod,
    groupTimePeriod
}