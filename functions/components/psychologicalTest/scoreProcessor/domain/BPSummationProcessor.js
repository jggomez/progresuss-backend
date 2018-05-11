
class BPSummationProcessor {

    constructor(BPAnswersUser,
        BPQuestionTypeTest,
        BPTypeTestScore) {
        this.BPAnswersUser = BPAnswersUser;
        this.BPQuestionTypeTest = BPQuestionTypeTest;
        this.BPTypeTestScore = BPTypeTestScore;
    }

    calculate(idAnswerUser) {

        let typeTestId;

        return this.BPAnswersUser.getAnswersUserByID(idAnswerUser).then(answersUser => {

            //console.log(answersUser);
            typeTestId = answersUser.typeTestId;
            let arrAnswersPromises = [];

            answersUser.answers.forEach(answerUser => {
                //console.log(answerUser);
                arrAnswersPromises.push(
                    this.BPQuestionTypeTest
                        .getByQuestionAndAnswer(answerUser.idQuestion, answerUser.idAnswer));
            });

            return Promise.all(arrAnswersPromises);
        }).then(answers => {

            return new Promise((resolve, reject) => {
                //console.log(answers)
                let score = 0;

                try {

                    answers.forEach(answer => {
                        //console.log('Answer value = ' + answer.value);
                        score += answer.value;
                    })
                } catch (err) {
                    return reject(err);
                }

                return resolve(score);
            });

        }).then(score => {
            // console.log(score);

            return this.BPTypeTestScore
                .getByTypeTestAndScore(typeTestId, score);

        }).then(recommendation => {

            return {
                numSessions: recommendation.numSessions,
                therapeuticPackage: recommendation.therapeuticPackage,
                result: recommendation.result
            };

        });
    }

}

exports.BPSummationProcessor = BPSummationProcessor;