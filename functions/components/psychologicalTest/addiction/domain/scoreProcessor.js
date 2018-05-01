
class ScoreProcessor {

    constructor(BPAnswerUser,
        BPQuestionAnswer,
        BPTypeTestScore) {
        this.BPAnswerUser = BPAnswerUser;
        this.BPQuestionAnswer = BPQuestionAnswer;
        this.BPTypeTestScore = BPTypeTestScore;
    }

    calculate(idAnswerUser) {

        let typeTestId;

        return this.BPAnswerUser.getAnswerUserByID(idAnswerUser).then(answersUser => {

            //console.log(answersUser);
            typeTestId = answersUser.typeTestId;
            let arrAnswersPromises = [];

            answersUser.answers.forEach(answerUser => {
                //console.log(answerUser);
                arrAnswersPromises.push(
                    this.BPQuestionAnswer
                        .getByQuestionAndAnswer(answerUser.idQuestion, answerUser.idAnswer));
            });

            return Promise.all(arrAnswersPromises);
        }).then(answers => {

            return new Promise((resolve, reject) => {
                //console.log(answers)

                let score = 0;

                try {

                    answers.forEach(answer => {
                        score += answer.value;
                    })
                } catch (err) {
                    return reject(err);
                }

                return resolve(score);
            });

        }).then(score => {

            //console.log(score);

            return this.BPTypeTestScore
                .getByTypeTestAndScore(typeTestId, score);

        }).then(recommendation => {

            return {
                numSessions: recommendation.numSessions,
                result: recommendation.result
            };

        });

    }


}

exports.ScoreProcessor = ScoreProcessor;