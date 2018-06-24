const bpSummationProcessor = require('./../../scoreProcessor/domain/BPSummationProcessor.js');
const bpNutritionalProcessor = require('./../../scoreProcessor/domain/BPNutritionalProcessor.js');
const bpCoupleProcessor = require('./../../scoreProcessor/domain/BPCoupleProcessor');
const bpTypeTestScore = require('./../../configuration/domain/BPTypeTestScore.js');
const typeTestScoreDAO = require('./../../configuration/data/typeTestScoreDAO.js');

class BPTestProcessor {
    
    constructor(BPAnswersUser,
        BPQuestionTypeTest,
        BPTypeTest) {
        this.BPAnswersUser = BPAnswersUser;
        this.BPQuestionTypeTest = BPQuestionTypeTest;
        this.BPTypeTest = BPTypeTest;
    }

    execute(idAnswerUser) {

        let typeTestId;
        let userId;
        let arrAnswers;
        let qualificationType;

        return this.BPAnswersUser.getAnswersUserByID(idAnswerUser).then(answersUser => {

            console.log(answersUser);
            typeTestId = answersUser.typeTestId;
            userId = answersUser.userId;
            let arrAnswersPromises = [];

            answersUser.answers.forEach(answerUser => {
                arrAnswersPromises.push(
                    this.BPQuestionTypeTest
                        .getByQuestionAndAnswerGraph(answerUser.idQuestion, answerUser.idAnswer));
            });

            return Promise.all(arrAnswersPromises);

        }).then(answers => {

            arrAnswers = answers;
    
            return new Promise((resolve, reject) => {
                
                let objTypeTest;
    
                try {
                    objTypeTest = this.BPTypeTest.getById(typeTestId)
                } catch (err) {
                    return reject(err);
                }
    
                return resolve(objTypeTest);
            });
        }).then(objTypeTest => {
        
            if(objTypeTest.qualificationType === 1) {
                const objBpSummationProcessor =
                    new bpSummationProcessor.BPSummationProcessor(
                        new bpTypeTestScore.BPTypeTestScore(
                            new typeTestScoreDAO.TypeTestScoreDAO()
                        )
                    );
                return objBpSummationProcessor.calculate(typeTestId, arrAnswers);
            } else if(objTypeTest.qualificationType === 2) {
                const objBpNutritionalProcessor =
                    new bpNutritionalProcessor.BPNutritionalProcessor(
                        new bpTypeTestScore.BPTypeTestScore(
                            new typeTestScoreDAO.TypeTestScoreDAO()
                        )
                    );
                return objBpNutritionalProcessor.calculate(typeTestId, arrAnswers, userId);
            } else if(objTypeTest.qualificationType === 3) {
                const objBpCoupleProcessor =
                    new bpCoupleProcessor.BPCoupleProcessor(
                        new bpTypeTestScore.BPTypeTestScore(
                            new typeTestScoreDAO.TypeTestScoreDAO()
                        )
                    );
                return objBpCoupleProcessor.calculate(typeTestId, arrAnswers, userId);
            }
    
            return "N/A";
        });
    }
}

exports.BPTestProcessor = BPTestProcessor;