
const bpSummationProcessor = require('./../scoreProcessor/domain/BPSummationProcessor.js');
const bpAnswersUser = require('./../answersUser/domain/BPAnswersUser.js');
const answersUserDAO = require('./../answersUser/data/answersUserDAO.js');
const bpQuestionTypeTest = require('./../configuration/domain/BPQuestionTypeTest.js');
const questionTypeTestDAO = require('./../configuration/data/questionTypeTestDAO.js');
const bpTypeTestScore = require('./../configuration/domain/BPTypeTestScore.js');
const typeTestScoreDAO = require('./../configuration/data/typeTestScoreDAO.js');

exports.handler = (req, resp, next) => {

    //Check validity
    //req.check('idAnswer', 'Invalid idAnswer').isEmail();

    let idAnswer = req.body.idAnswer;

    const objSummationProcessor =
        new bpSummationProcessor.BPSummationProcessor(
            new bpAnswersUser.BPAnswersUser(
                new answersUserDAO.AnswersUserDAO()
            ),
            new bpQuestionTypeTest.BPQuestionTypeTest(
                new questionTypeTestDAO.QuestionTypeTestDAO()
            ),
            new bpTypeTestScore.BPTypeTestScore(
                new typeTestScoreDAO.TypeTestScoreDAO()
            )
        );

    objSummationProcessor.calculate(idAnswer).then(result => {
        return resp.status(200).json({ "responseCode": 200, "response": result });
    }).catch(err => {
        let error = new Error(err.toString());
        error.name = "ProgressusUnexpected";
        return next(error);
    });

}
