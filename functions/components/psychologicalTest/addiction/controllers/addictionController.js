
const scoreProcessor = require('./../domain/scoreProcessor.js');
const bpAnswerUser = require('./../../answersUser/domain/BPanswerUser.js');
const answerDAO = require('./../../answersUser/data/answersUserDAO.js');
const bpQuestionAnswer = require('./../../questionAnswers/domain/BPQuestionAnswer.js');
const questionAnswerDAO = require('./../../questionAnswers/data/questionAnswerDAO.js');
const bpTypeTestScore = require('./../../configuration/domain/BPTypeTestScore.js');
const typeTestScoreDAO = require('./../../configuration/data/typeTestScoreDAO.js');

exports.handler = (req, resp, next) => {

    //Check validity
    //req.check('idAnswer', 'Invalid idAnswer').isEmail();

    let idAnswer = req.body.idAnswer;

    const objScoreProcessor =
        new scoreProcessor.ScoreProcessor(
            new bpAnswerUser.BPanswerUser(
                new answerDAO.AnswersUserDAO()
            ),
            new bpQuestionAnswer.BPQuestionAnswer(
                new questionAnswerDAO.QuestionAnswerDAO()
            ),
            new bpTypeTestScore.BPTypeTestScore(
                new typeTestScoreDAO.TypeTestScoreDAO()
            )
        );

    objScoreProcessor.calculate(idAnswer).then(result => {
        return resp.status(200).json({ "responseCode": 200, "response": result });
    }).catch(err => {
        let error = new Error(err.toString());
        error.name = "ProgressusUnexpected";
        return next(error);
    });

}
