
function getTrailingPrice(side, trailPercent, currentPrice) {
    if (side == 'short' || side == 'sell') {
        let activationPrice = currentPrice
        let trailingPrice = activationPrice - ((trailPercent/100)* activationPrice)


    }
}

