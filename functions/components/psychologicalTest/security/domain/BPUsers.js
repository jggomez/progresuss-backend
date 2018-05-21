
class BPUsers {

    constructor(usersDAO) {
        this.usersDAO = usersDAO;
    }

    getById(id) {
        return this.usersDAO.getById(id);
    }

}

exports.BPUsers = BPUsers;