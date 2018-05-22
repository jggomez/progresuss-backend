
class NutritionalLoseWeightMapper {

    calculatePercentile(age, gender, score) {
        let loseWeightMap = this.buidMapper(age, gender);
        let loseWeightPercentile = loseWeightMap.get(score);
        if(loseWeightPercentile === undefined) {
            loseWeightPercentile = 1;
        }

        return loseWeightPercentile;
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
        map.set(0, 10);
        map.set(1, 20);
        // loseWeightMap.set(2, 30);
        map.set(2, 40);
        map.set(3, 50);
        map.set(4, 60);
        map.set(6, 70);
        map.set(8, 80);
        map.set(11, 90);
        map.set(19, 99);

        return map;
    }

    getMap_Men_Range2() {      
        var map = new Map();
        map.set(0, 10);
        map.set(2, 20);
        map.set(3, 30);
        map.set(4, 40);
        map.set(5, 50);
        map.set(7, 60);
        map.set(8, 70);
        map.set(9, 80);
        map.set(12, 90);
        map.set(19, 99);

        return map;
    }

    getMap_Women_Range1() {    
        var map = new Map();
        map.set(0, 1);
        map.set(3, 10);
        map.set(6, 20);
        map.set(8, 30);
        map.set(9, 40);
        map.set(12, 50);
        map.set(13, 60);
        map.set(15, 70);
        map.set(16, 80);
        map.set(18, 90);
        map.set(21, 99);

        return map;
    }

    getMap_Women_Range2() {     
        var map = new Map();
        map.set(0, 1);
        map.set(1, 10);
        map.set(5, 20);
        map.set(7, 30);
        map.set(8, 40);
        map.set(10, 50);
        map.set(11, 60);
        map.set(13, 70);
        map.set(14, 80);
        map.set(16, 90);
        map.set(20, 99);

        return map;
    }

}

exports.NutritionalLoseWeightMapper = NutritionalLoseWeightMapper;