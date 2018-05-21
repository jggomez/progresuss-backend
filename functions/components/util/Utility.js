
class Utility {

    constructor() {

    }

    logErrorFirebase(admin, error) {
        admin.firestore().collection("errors").add({
            createdAt: this.formatDate(Date.now()),
            error: error.message,
            platform: "BACKEND",
            type: "FRAMEWORK"
        });
    }

    formatDate(date) {
        var d = new Date(date),
            month = String(d.getMonth() + 1),
            day = String(d.getDate()),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    getAge(dateString) {
        let year = Number(dateString.substr(0, 4));
        let month = Number(dateString.substr(5, 2)) - 1;
        let day = Number(dateString.substr(8, 12));
        var birthDate = new Date(year, month, day);
        var ageDifMs = Date.now() - birthDate.getTime();
        var ageDate = new Date(ageDifMs);

        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    /**
     * Convert a `Map` to a standard
     * JS object recursively.
     * 
     * @param {Map} map to convert.
     * @returns {Object} converted object.
     * https://gist.github.com/davemackintosh/3b9c446e8681f7bbe7c5
    */
    map_to_object(map) {
        const out = Object.create(null)
        map.forEach((value, key) => {
            if (value instanceof Map) {
                out[key] = this.map_to_object(value);
            }
            else {
                out[key] = value;
            }
        })
        return out;
    }

}

exports.Utility = Utility;