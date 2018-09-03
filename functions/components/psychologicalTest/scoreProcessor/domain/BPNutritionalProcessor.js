const bpUsers = require('./../../security/domain/BPUsers.js');
const usersDAO = require('./../../security/data/usersDAO.js');
const utility = require('./../../../util/Utility.js');
const nutritionalLoseWeightMapper = require('./../util/NutritionalLoseWeightMapper.js');
const nutritionalBulimiaMapper = require('./../util/NutritionalBulimiaMapper.js');
const nutritionalBodyDissatisfactionMapper = require('./../util/NutritionalBodyDissatisfactionMapper.js');
const nutritionalPercentilLevelCalculator = require('./../util/NutritionalPercentilLevelCalculator.js');

class BPNutritionalProcessor {
    
    constructor(BPTypeTestScore) {
        this.BPTypeTestScore = BPTypeTestScore;
    }

    calculate(typeTestId, answers, userId) {
        let loseWeightScore = 0;
        let loseWeightPercentile = 0;
        let loseWeightPercentileLevel = 0;
        let bulimiaScore = 0;
        let bulimiaPercentile = 0;
        let bulimiaPercentileLevel = 0;
        let bodyDissatisfactionScore = 0;
        let bodyDissatisfactionPercentile = 0;
        let bodyDissatisfactionPercentileLevel = 0;
        let totalPercentile = 0;

        return new Promise((resolve, reject) => {

            try {
                let order;
                answers.forEach(answer => {
                    order = answer.question.order;

                    if(order === 1 || order === 7 || order === 11 || order === 16 ||
                        order === 25 || order === 32 || order === 49) {
                        loseWeightScore = answer.question.isSpecial ? 
                            loseWeightScore += answer.answer.valueSpecial :
                            loseWeightScore += answer.answer.value;
                    } else if(order === 4 || order === 5 || order === 28 || order === 38 ||
                        order === 46 || order === 53 || order === 61) {
                        bulimiaScore = answer.question.isSpecial ? 
                            bulimiaScore += answer.answer.valueSpecial :
                            bulimiaScore += answer.answer.value;
                    } else if(order === 2 || order === 9 || order === 12 || order === 19 ||
                        order === 31 || order === 45 || order === 55 || order === 59 || order === 62) {
                        bodyDissatisfactionScore = answer.question.isSpecial ? 
                            bodyDissatisfactionScore += answer.answer.valueSpecial :
                            bodyDissatisfactionScore += answer.answer.value;
                    }
                });
            } catch (err) {
                return reject(err);
            }

            return resolve(true);
        }).then(res => {

            // Obtener usuario
            return new Promise((resolve, reject) => {
            
                let objUser;    
                try {
                    let objBpUser =
                        new bpUsers.BPUsers(
                            new usersDAO.UsersDAO()
                        );

                    objUser = objBpUser.getById(userId);
                } catch (err) {
                    return reject(err);
                }
    
                return resolve(objUser);
            });
        }).then(user => {

            // Obtener info usuario: Edad y Género
            let objUtility = new utility.Utility();
            let userAge = objUtility.getAge(user.birthDate);
            let userGender = user.gender;

            // Calcular percentiles para cada categoría
            if(loseWeightScore === 0 && bulimiaScore === 0 && bodyDissatisfactionScore === 0) {
                loseWeightPercentile = 1;
                bulimiaPercentile = 1;
                bodyDissatisfactionPercentile = 1;
            } else {
                // Calcular percentil 'Deseos de adelgazar'
                let objLoseWeightMapper = new nutritionalLoseWeightMapper.NutritionalLoseWeightMapper();
                loseWeightPercentile = objLoseWeightMapper.calculatePercentile(userAge, userGender, loseWeightScore);
                // Calcular percentil 'Bulimia'
                let objBulimiaMapper = new nutritionalBulimiaMapper.NutritionalBulimiaMapper();
                bulimiaPercentile = objBulimiaMapper.calculatePercentile(userAge, userGender, bulimiaScore);
                // Calcular percentil 'Insatisfacción corporal'
                let objBodyDissatisfactionMapper = new nutritionalBodyDissatisfactionMapper.NutritionalBodyDissatisfactionMapper();
                bodyDissatisfactionPercentile = objBodyDissatisfactionMapper.calculatePercentile(userAge, userGender, bodyDissatisfactionScore);
            }

            // Calcular el nivel del percentil (0=Bajo, 1=Medio, 2=Alto)
            let objNutritionalPercentilLevelCalculator = new nutritionalPercentilLevelCalculator.NutritionalPercentilLevelCalculator();
            loseWeightPercentileLevel = objNutritionalPercentilLevelCalculator.getPercentilLevel(loseWeightPercentile);
            bulimiaPercentileLevel = objNutritionalPercentilLevelCalculator.getPercentilLevel(bulimiaPercentile);
            bodyDissatisfactionPercentileLevel = objNutritionalPercentilLevelCalculator.getPercentilLevel(bodyDissatisfactionPercentile);

            // Calcular el percentil total
            totalPercentile = objNutritionalPercentilLevelCalculator.getTotalLevel(
                loseWeightPercentileLevel, bulimiaPercentileLevel, bodyDissatisfactionPercentileLevel);

            // Obtener respuesta
            return this.BPTypeTestScore.getByTypeTestAndScore(typeTestId, totalPercentile);
        }).then(recommendation => {
            return {
                numSessions: recommendation.numSessions,
                therapeuticPackage: recommendation.therapeuticPackage,
                result: recommendation.result,
                userId: userId
            };
        });
    }
}

exports.BPNutritionalProcessor = BPNutritionalProcessor;