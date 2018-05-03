

class BPAnswersUser {

    constructor(answerUserDAO) {
        this.answerUserDAO = answerUserDAO;
    }

    getAnswersUserByID(id) {
        return this.answerUserDAO.getById(id);
    }

}

exports.BPAnswersUser = BPAnswersUser;