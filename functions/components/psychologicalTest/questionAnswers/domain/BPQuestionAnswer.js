
class BPQuestionAnswer {

    constructor(QuestionAnswerDAO) {
        this.QuestionAnswerDAO = QuestionAnswerDAO;
    }

    getByQuestionAndAnswer(questionId, answerId) {
        return this.QuestionAnswerDAO
            .getByQuestionAndAnswer(questionId, answerId);
    }
}

exports.BPQuestionAnswer = BPQuestionAnswer;