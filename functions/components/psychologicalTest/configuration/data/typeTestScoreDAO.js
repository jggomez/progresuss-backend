const admin = require("firebase-admin");

class TypeTestScoreDAO {

    constructor() {
        this.ref = 'typeTestScore';
        this.adminDB = admin.firestore();
    }

    getByTypeTestAndScore(typeTestId, score) {
        return this.adminDB.collection(`${this.ref}`)
            .where("typeTestId", "==", typeTestId)
            .where("minScore", "<=", score)            
            .get().then(querySnapshot => {

                let result = undefined;

                if (querySnapshot.size > 0) {
                    querySnapshot.forEach(document =>{
                        if(score <= document.data().maxScore){
                            result = document.data();    
                        }                        
                    })
                    
                }

                return result;
            });
    }

}

exports.TypeTestScoreDAO = TypeTestScoreDAO;