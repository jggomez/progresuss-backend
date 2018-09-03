const admin = require("firebase-admin");

class UserDAO {

    constructor() {
        this.ref = 'users';
        this.adminDB = admin.firestore();        
    }

    getById(id) {
        return this.adminDB.collection(`${this.ref}`)
            .doc(`${id}`)
            .get().then(resp => resp.data());
    }
    
}

exports.UserDAO = UserDAO;