const couplePercentileLevelCalculator = require('../util/CouplePercentileLevelCalculator.js');

class BPCoupleProcessor {

    constructor(BPTypeTestScore) {
        this.BPTypeTestScore = BPTypeTestScore;
    }

    calculate(typeTestId, answers, userId) {

        let interactionSatisfactionScore = 0;
        let emotionalSatisfactionScore = 0;
        let organizationalSatisfactionScore = 0;
        let interactionSatisfactionPercentileLevel = 0;
        let emotionalSatisfactionPercentileLevel = 0;
        let organizationalSatisfactionPercentileLevel = 0;
        let totalPercentile = 0;
        let objCouplePercentileLevelCalculator;

        return new Promise((resolve, reject) => {

            try {
                let order;
                answers.forEach(answer => {
                    order = answer.question.order;

                    if(order >= 1 && order <= 10) {
                        interactionSatisfactionScore += answer.answer.value;
                    } else if(order >= 11 && order <= 15) {
                        emotionalSatisfactionScore += answer.answer.value;
                    } else if(order >= 16 && order <= 24) {
                        organizationalSatisfactionScore += answer.answer.value;
                    }
                });
            } catch (err) {
                return reject(err);
            }

            return resolve(true);
        }).then(res => {

            // Calcular el nivel del percentil (0=Bajo, 1=Medio, 2=Alto)
            objCouplePercentileLevelCalculator = new couplePercentileLevelCalculator.CouplePercentileLevelCalculator();
            interactionSatisfactionPercentileLevel = objCouplePercentileLevelCalculator.getInteractionSatisfaction(interactionSatisfactionScore);
            emotionalSatisfactionPercentileLevel = objCouplePercentileLevelCalculator.getEmotionalSatisfaction(emotionalSatisfactionScore);
            organizationalSatisfactionPercentileLevel = objCouplePercentileLevelCalculator.getOrganizationalSatisfaction(organizationalSatisfactionScore);

            totalPercentile = objCouplePercentileLevelCalculator.getTotalLevel(
                interactionSatisfactionPercentileLevel, emotionalSatisfactionPercentileLevel, organizationalSatisfactionPercentileLevel);

            // Obtener respuesta
            return this.BPTypeTestScore.getByTypeTestAndScore(typeTestId, totalPercentile);
        }).then(recommendation => {

            let result = recommendation.result;
            result = result.replace("AAA", objCouplePercentileLevelCalculator.getLevelDescription(interactionSatisfactionPercentileLevel));
            result = result.replace("BBB", objCouplePercentileLevelCalculator.getLevelDescription(emotionalSatisfactionPercentileLevel));
            result = result.replace("CCC", objCouplePercentileLevelCalculator.getLevelDescription(organizationalSatisfactionPercentileLevel));

            return {
                numSessions: recommendation.numSessions,
                therapeuticPackage: recommendation.therapeuticPackage,
                result: result,
                userId: userId
            };
        });
    }
}

exports.BPCoupleProcessor = BPCoupleProcessor;