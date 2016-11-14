module.exports = {
    locatie: {},

    saveLocatie: function(device) {
        this.locatie[locatie.id] = locatie;
    },
    AllLocaties: function() {
        var rtnValue = [];
        for (var item in this.locatie) {
            rtnValue.push(this.locatie[item]);
        };
        return rtnValue;
    },
    findLocatie: function(id) {
        return this.locatie[id];
    },

    pauze: {},

    savePauze: function(pauze) {
        this.pauze[pauze.id] = pauze;
    },
    AllPauze: function() {
        var rtnValue = [];
        for (var item in this.pauze) {
            rtnValue.push(this.pauze[item]);
        };
        return rtnValue;
    },

    findPauze: function(id) {
        return this.pauze[id];
    },

    kassa: {},

    saveKassa: function(kassa) {
        this.kassa[kassa.id] = kassa;
    },
    AllKassa: function() {
        var rtnValue = [];
        for (var item in this.kassa) {
            rtnValue.push(this.kassa[item]);
        };
        return rtnValue;
    },
    findKassa: function(id) {
        return this.kassa[id];
    },
     kassa_rapport: {},
    findKassaRapport: function(id) {
        return this.kassa_rapport[id];
    },
       verkoop: {},

    findVerkoop: function(id) {
        return this.verkoop[id];
    }
};



