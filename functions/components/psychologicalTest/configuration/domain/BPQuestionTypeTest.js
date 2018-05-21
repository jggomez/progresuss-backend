
class BPQuestionTypeTest {

    constructor(QuestionTypeTestDAO) {
        this.QuestionTypeTestDAO = QuestionTypeTestDAO;
    }

    getByQuestionAndAnswer(questionId, answerId) {
        return this.QuestionTypeTestDAO
            .getByQuestionAndAnswer(questionId, answerId);
    }

    getByQuestionAndAnswerGraph(questionId, answerId) {
        return this.QuestionTypeTestDAO
            .getByQuestionAndAnswerGraph(questionId, answerId);
    }
}

exports.BPQuestionTypeTest = BPQuestionTypeTest;