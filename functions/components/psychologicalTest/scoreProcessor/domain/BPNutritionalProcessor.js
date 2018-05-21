const bpUsers = require('./../../security/domain/BPUsers.js');
const usersDAO = require('./../../security/data/usersDAO.js');
const utility = require('./../../../util/Utility.js');

class BPNutritionalProcessor {

    constructor(BPTypeTestScore) {
        this.BPTypeTestScore = BPTypeTestScore;
    }

    calculate(typeTestId, answers, userId) {
        //let score = 0;
        // let scoreSpecial = 0;
        // let countScore = 0;
        // let countScoreSpecial = 0;
        
        let loseWeightScore = 0;
        let loseWeightCounter = 0;
        let loseWeightPercentile = 0;
        let bulimiaScore = 0;
        let bulimiaCounter = 0;
        let bulimiaPercentile = 0;
        let bodyDissatisfactionScore = 0;
        let bodyDissatisfactionCounter = 0;
        let bodyDissatisfactionPercentile = 0;
        // let totalPercentile = 0;

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
                        loseWeightCounter++;
                    } else if(order === 4 || order === 5 || order === 28 || order === 38 ||
                        order === 46 || order === 53 || order === 61) {
                        bulimiaScore = answer.question.isSpecial ? 
                            bulimiaScore += answer.answer.valueSpecial :
                            bulimiaScore += answer.answer.value;
                        bulimiaCounter++;
                    } else if(order === 2 || order === 9 || order === 12 || order === 19 ||
                        order === 31 || order === 45 || order === 55 || order === 59 || order === 62) {
                        bodyDissatisfactionScore = answer.question.isSpecial ? 
                            bodyDissatisfactionScore += answer.answer.valueSpecial :
                            bodyDissatisfactionScore += answer.answer.value;
                        bodyDissatisfactionCounter++;
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

            // Obtener info usuario
            let objUtility = new utility.Utility();
            let userAge = objUtility.getAge(user.birthDate);
            let userGender = user.gender;

            if(loseWeightScore === 0 && bulimiaScore === 0 && bodyDissatisfactionScore === 0) {
                loseWeightPercentile = 1;
                bulimiaPercentile = 1;
                bodyDissatisfactionPercentile = 1;
            }

            var myMap = new Map();
            myMap.set(0, 10);
            myMap.set(1, 20);
            myMap.set(2, 30);
            myMap.set(3, 50);

            console.log("loseWeightScore = " + loseWeightScore);
            loseWeightPercentile = myMap.get(loseWeightScore);
            console.log("loseWeightPercentile = " + loseWeightPercentile);
            
            // let userBirthDate = user.birthDate;
            // let year = Number(userBirthDate.substr(0, 4));
            // let month = Number(userBirthDate.substr(5, 2)) - 1;
            // let day = Number(userBirthDate.substr(8, 12));
            // var birthDate = new Date(year, month, day);
            // console.log("birthDate = " + birthDate);
            // var today = new Date();
            // console.log("today = " + today);
            // Obtener sexo


            // Calcular con base a tablas

            // console.log("loseWeightScore = " + loseWeightScore);
            // console.log("loseWeightCounter = " + loseWeightCounter);
            // console.log("bulimiaScore = " + bulimiaScore);
            // console.log("bulimiaCounter = " + bulimiaCounter);
            // console.log("bodyDissatisfactionScore = " + bodyDissatisfactionScore);
            // console.log("bodyDissatisfactionCounter = " + bodyDissatisfactionCounter);
            console.log("loseWeightPercentile = " + loseWeightPercentile);
            console.log("bulimiaPercentile = " + bulimiaPercentile);
            console.log("bodyDissatisfactionPercentile = " + bodyDissatisfactionPercentile);

            return "";
        });
    }
}

exports.BPNutritionalProcessor = BPNutritionalProcessor;