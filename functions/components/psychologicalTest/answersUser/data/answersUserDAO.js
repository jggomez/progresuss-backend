const admin = require("firebase-admin");

class AnswersUserDAO {

    constructor() {
        this.ref = 'answersUser';
        this.adminDB = admin.firestore();
    }

    getById(id) {
        return this.adminDB.collection(`${this.ref}`)
            .doc(`${id}`)
            .get().then(resp => resp.data());
    }

}

exports.AnswersUserDAO = AnswersUserDAO;



