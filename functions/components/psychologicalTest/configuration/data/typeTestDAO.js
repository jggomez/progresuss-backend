const admin = require("firebase-admin");

class TypeTestDAO {

    constructor() {
        this.ref = 'typesTest';
        this.adminDB = admin.firestore();
    }

    getById(id) {
        return this.adminDB.collection(`${this.ref}`)
            .doc(`${id}`)
            .get().then(resp => resp.data());
    }

}

exports.TypeTestDAO = TypeTestDAO;