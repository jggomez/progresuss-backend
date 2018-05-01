

class BPanswerUser {

    constructor(answerUserDAO) {
        this.answerUserDAO = answerUserDAO;
    }

    getAnswerUserByID(id) {
        return this.answerUserDAO.getById(id);
    }

}

exports.BPanswerUser = BPanswerUser;