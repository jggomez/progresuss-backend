
class CouplePercentileLevelCalculator {

    getInteractionSatisfaction(score) {
        if(score <= 16) {
            return 0; // Bajo
        }
        else if(score >= 17 && score <= 25) {
            return 1; // Medio
        }
        else if(score >= 26) {
            return 2; // Alto
        }

        return 0;
    }

    getEmotionalSatisfaction(score) {
        if(score <= 7) {
            return 0; // Bajo
        }
        else if(score >= 8 && score <= 11) {
            return 1; // Medio
        }
        else if(score >= 12) {
            return 2; // Alto
        }

        return 0;
    }

    getOrganizationalSatisfaction(score) {
        if(score <= 16) {
            return 0; // Bajo
        }
        else if(score >= 17 && score <= 24) {
            return 1; // Medio
        }
        else if(score >= 25) {
            return 2; // Alto
        }

        return 0;
    }

    getTotalLevel(interactionSatisfactionPercentileLevel, emotionalSatisfactionPercentileLevel, organizationalSatisfactionPercentileLevel) {
        if(interactionSatisfactionPercentileLevel === 2 || emotionalSatisfactionPercentileLevel === 2 || organizationalSatisfactionPercentileLevel === 2) {
            return 2; // Alto
        }
        else if(interactionSatisfactionPercentileLevel === 1 || emotionalSatisfactionPercentileLevel === 1 || organizationalSatisfactionPercentileLevel === 1) {
            return 1; // Medio
        }
        else if(interactionSatisfactionPercentileLevel === 0 || emotionalSatisfactionPercentileLevel === 0 || organizationalSatisfactionPercentileLevel === 0) {
            return 0; // Bajo
        }

        return 0;
    }

    getLevelDescription(level) {
        if(level === 0) {
            return "Bajo";
        } else if(level === 1) {
            return "Medio";
        } else if(level === 2) {
            return "Alto";
        }

        return "";
    }
}

exports.CouplePercentileLevelCalculator = CouplePercentileLevelCalculator;