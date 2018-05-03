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

}

exports.QuestionTypeTestDAO = QuestionTypeTestDAO;