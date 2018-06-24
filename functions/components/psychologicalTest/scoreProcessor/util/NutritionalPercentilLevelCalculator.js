
class NutritionalPercentilLevelCalculator {

    getPercentilLevel(percentileValue) {
        if(percentileValue >= 0 && percentileValue <= 20) {
            return 0; // Bajo
        }
        else if(percentileValue >= 30 && percentileValue <= 60) {
            return 1; // Medio
        }
        else if(percentileValue >= 70 && percentileValue <= 99) {
            return 2; // Alto
        }

        return 0;
    }

    getTotalLevel(loseWeightPercentileLevel, bulimiaPercentileLevel, bodyDissatisfactionPercentileLevel) {
        if(loseWeightPercentileLevel === 2 || bulimiaPercentileLevel === 2 || bodyDissatisfactionPercentileLevel === 2) {
            return 2; // Alto
        }
        else if(loseWeightPercentileLevel === 1 || bulimiaPercentileLevel === 1 || bodyDissatisfactionPercentileLevel === 1) {
            return 1; // Medio
        }
        else if(loseWeightPercentileLevel === 0 || bulimiaPercentileLevel === 0 || bodyDissatisfactionPercentileLevel === 0) {
            return 0; // Bajo
        }

        return 0;
    }
}

exports.NutritionalPercentilLevelCalculator = NutritionalPercentilLevelCalculator;