
class BPQuestionTypeTest {

    constructor(QuestionTypeTestDAO) {
        this.QuestionTypeTestDAO = QuestionTypeTestDAO;
    }

    getByQuestionAndAnswer(questionId, answerId) {
        return this.QuestionTypeTestDAO
            .getByQuestionAndAnswer(questionId, answerId);
    }
}

exports.BPQuestionTypeTest = BPQuestionTypeTest;