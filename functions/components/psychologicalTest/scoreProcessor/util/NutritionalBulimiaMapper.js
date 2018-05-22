
class NutritionalBulimiaMapper {

    calculatePercentile(age, gender, score) {
        let builimiaMap = this.buidMapper(age, gender);
        let builimiaPercentile = builimiaMap.get(score);
        if(builimiaPercentile === undefined) {
            builimiaPercentile = 1;
        }

        return builimiaPercentile;
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
        // map.set(3, 30);
        map.set(3, 40);
        map.set(4, 50);
        map.set(5, 60);
        // map.set(7, 70);
        map.set(7, 80);
        map.set(9, 90);
        map.set(14, 99);

        return map;
    }

    getMap_Men_Range2() {      
        var map = new Map();
        map.set(0, 10);
        map.set(1, 20);
        map.set(2, 30);
        map.set(3, 40);
        map.set(4, 50);
        map.set(5, 60);
        map.set(6, 70);
        map.set(8, 80);
        map.set(10, 90);
        map.set(13, 99);

        return map;
    }

    getMap_Women_Range1() {    
        var map = new Map();
        map.set(0, 1);
        map.set(1, 10);
        map.set(2, 20);
        map.set(3, 30);
        map.set(4, 40);
        map.set(5, 50);
        map.set(6, 60);
        map.set(7, 70);
        map.set(8, 80);
        map.set(11, 90);
        map.set(19, 99);

        return map;
    }

    getMap_Women_Range2() {       
        var map = new Map();
        map.set(0, 10);
        map.set(1, 20);
        map.set(2, 30);
        // map.set(3, 40);
        map.set(3, 50);
        map.set(4, 60);
        map.set(5, 70);
        map.set(6, 80);
        map.set(7, 90);
        map.set(16, 99);

        return map;
    }

}

exports.NutritionalBulimiaMapper = NutritionalBulimiaMapper;