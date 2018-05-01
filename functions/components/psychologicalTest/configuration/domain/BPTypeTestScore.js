

class BPTypeTestScore {

    constructor(typeTestScoreDAO) {
        this.typeTestScoreDAO = typeTestScoreDAO;
    }

    getByTypeTestAndScore(typeTestId, score) {
        return this.typeTestScoreDAO
            .getByTypeTestAndScore(typeTestId, score);
    }

}

exports.BPTypeTestScore = BPTypeTestScore;