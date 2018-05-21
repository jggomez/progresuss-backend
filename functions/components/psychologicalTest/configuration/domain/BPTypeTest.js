
class BPTypeTest {

    constructor(typeTestDAO) {
        this.typeTestDAO = typeTestDAO;
    }

    getById(id) {
        return this.typeTestDAO.getById(id);
    }

}

exports.BPTypeTest = BPTypeTest;