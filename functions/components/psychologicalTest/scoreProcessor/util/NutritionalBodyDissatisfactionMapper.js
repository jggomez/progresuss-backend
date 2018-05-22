
class NutritionalBodyDissatisfactionMapper {

    calculatePercentile(age, gender, score) {
        let bodySatisfactionMap = this.buidMapper(age, gender);
        let bodySatisfactionPercentile = bodySatisfactionMap.get(score);
        if(bodySatisfactionPercentile === undefined) {
            bodySatisfactionPercentile = 1;
        }

        return bodySatisfactionPercentile;
    }

    buidMapper(age, gender) {
        if(age <= 22 && gender === "M") {
            return this.getMap_Men_Range1();
        } else if(age >= 23 && gender === "M") {
            return this.getMap_Men_Range2();
        } else if(age <= 22 && gender === "F") {
            return this.getMap_Women_Range1();
        } else if(age >= 23 && gender === "F") {
            return this.getMap_Women_Range2();
        }

        return null;
    }

    getMap_Men_Range1() {
        // Key: Valor sumatoria
        // Value: Percentil        
        var map = new Map();
        map.set(0, 1);
        map.set(1, 10);
        map.set(2, 20);
        map.set(3, 30);
        map.set(4, 40);
        map.set(6, 50);
        map.set(7, 60);
        map.set(8, 70);
        map.set(10, 80);
        map.set(14, 90);
        map.set(26, 99);

        return map;
    }

    getMap_Men_Range2() {      
        var map = new Map();
        map.set(0, 1);
        map.set(1, 10);
        map.set(3, 20);
        map.set(5, 30);
        map.set(6, 40);
        map.set(8, 50);
        map.set(9, 60);
        map.set(11, 70);
        map.set(12, 80);
        map.set(16, 90);
        map.set(27, 99);

        return map;
    }

    getMap_Women_Range1() {    
        var map = new Map();
        map.set(0, 1);
        map.set(5, 10);
        map.set(7, 20);
        map.set(11, 30);
        map.set(13, 40);
        map.set(14, 50);
        map.set(16, 60);
        map.set(18, 70);
        map.set(21, 80);
        map.set(24, 90);
        map.set(27, 99);

        return map;
    }

    getMap_Women_Range2() {       
        var map = new Map();
        map.set(0, 1);
        map.set(4, 10);
        map.set(7, 20);
        map.set(8, 30);
        map.set(10, 40);
        map.set(12, 50);
        map.set(15, 60);
        map.set(17, 70);
        map.set(21, 80);
        map.set(23, 90);
        map.set(27, 99);

        return map;
    }

}

exports.NutritionalBodyDissatisfactionMapper = NutritionalBodyDissatisfactionMapper;