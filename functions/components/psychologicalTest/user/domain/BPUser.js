

class BPUser {

    constructor(userDAO) {
        this.userDAO = userDAO;
    }

    getUserByID(id) {
        return this.userDAO.getById(id);
    }

}

exports.BPUser = BPUser;