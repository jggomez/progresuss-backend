const admin = require("firebase-admin");

class QuestionTypeTestDAO {

    constructor() {
        this.ref = 'questionTypeTest';
        this.adminDB = admin.firestore();
    }

    getByQuestionAndAnswer(questionId, answerId) {
        return this.adminDB.collection(`${this.ref}`)
            .doc(questionId)
            .collection("answers")
            .doc(answerId)
            .get().then(documentSnapshot => {
                let answer = undefined;

                if (documentSnapshot.exists) {
                    answer = documentSnapshot.data();
                }

                return answer;
            });
    }

    getByQuestionAndAnswerGraph(questionId, answerId) {
        let answer = undefined;

        return this.adminDB.collection(`${this.ref}`)
            .doc(questionId)
            .collection("answers")
            .doc(answerId)
            .get().then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    answer = documentSnapshot.data();
                }

                return answer;
            }).then(res => {
                return this.adminDB.collection(`${this.ref}`)
                    .doc(questionId)
                    .get();
            }).then(documentSnapshot => {
                let question = undefined;
                if (documentSnapshot.exists) {
                    question = documentSnapshot.data();                            
                }

                return {
                    question: question, 
                    answer: answer
                };
            });
    }

}

exports.QuestionTypeTestDAO = QuestionTypeTestDAO;