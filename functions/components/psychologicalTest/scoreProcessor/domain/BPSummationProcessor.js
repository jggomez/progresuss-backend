
class BPSummationProcessor {

    constructor(BPTypeTestScore) {
        this.BPTypeTestScore = BPTypeTestScore;
    }

    calculate(typeTestId, answers) {

        return new Promise((resolve, reject) => {

            let score = 0;
            try {

                answers.forEach(answer => {
                    score += answer.answer.value;
                })
            } catch (err) {
                return reject(err);
            }

            return resolve(score);
        }).then(score => {
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