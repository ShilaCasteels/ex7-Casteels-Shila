// inladen van de dependencies - externe dependencies inladen via het commando: 
// npm install express --save
// npm install body-parser --save

var express = require('express'); // eenvoudige webserver in node js
var bodyParser = require('body-parser'); // extensie op express voor eenvoudig body uit te lezen

var uuid = require('uuid'); // package that gives the record a unique id

// data store
var dal = require("./storage.js");
// load vallidation
var validation = require("./validate.js");

// create the webserver variable
var app = express();
// automatic json body parsers - specificied in the request
app.use(bodyParser.json());

// a GET on /locatie
app.get("/locatie", function(request, response) {
    // response with all available locations 
    response.send(dal.AllLocaties());
});

// a GET on /locatie/:id
app.get("/locatie/:id", function(request, response) {
    var locatie = dal.findLocatie(request.params.id);
    if (locatie) {
        response.send(locatie);
    } else {
        response.status(404).send();
    }
});

// a POST on /locatie
app.post("/locatie", function(request, response) {
    // only data that matches with the variable 
    var locatie = request.body;

    // fill in the mandatory field(s)
    var errors = validation.fieldsNotEmpty(locatie, "id", "pauze_id", "pauze_tijd", "klas", "aantal_studenten_in_klas");
    if (errors) {
        response.status(400).send({
            message: "Following pauze_id does not excist, please create one in resource pauze" + errors.concat()
        });
        return;
    }

    // id must be unique
    var existingLocatie = dal.findlocatie(locatie.id);
    if (existingLocatie) {
        response.status(409).send({
            message: "id must be unique, it's already registered",
            link: "../locatie/" + existingLocatie.id
        });
        return;
    }


    // locatie is stored in the data store 'dal'
    dal.saveLocatie(locatie);
    // overwrite the default httpstatus (200) 
    response.status(201).location("../locatie/" + locatie.id).send();
});


// a GET on /pauze
app.get("/pauze", function(request, response) {
    // response with all available pauzes
    response.send(dal.AllPauze());
});

// a GET on /pauze/:id
app.get("/pauze/:id", function(request, response) {
    var pauze = dal.findPauze(request.params.id);
    if (pauze) {
        response.send(pauze);
    } else {
        response.status(404).send();
    }
});

// a POST on /pauze
app.post("/pauze", function(request, response) {
    // only data that matches with the variable 
    var pauze = request.body;

    // fill in the mandatory field(s)
    var errors = validation.fieldsNotEmpty(pauze, "pauze_tijd");
    if (errors) {
        response.status(400).send({
            message: "Following pauze_tijd already exists"
        });
        return;
    }

    // every pauze has his own unique id
    pauze.id = uuid.v4();
    // pauze is stored in the data store 'dal'
    dal.savePauze(pauze);
    // overwrite the default httpstatus (200) 
    response.status(201).location("../pauze/" + pauze.id).send();
});

// a GET on /kassa
app.get("/kassa", function(request, response) {
    // response with all available kassa
    response.send(dal.AllKassa());
});

// a GET on /kassa/:id
app.get("/kassa/:id", function(request, response) {
    var kassa = dal.findKassa(request.params.id);
    if (kassa) {
        response.send(kassa);
    } else {
        response.status(404).send();
    }
});

// a POST on /kassa
app.post("/kassa", function(request, response) {
    // only data that matches with the variable 
    var kassa = request.body;

    // fill in the mandatory field(s)
    var errors = validation.fieldsNotEmpty(kassa, "kassa_id", "lodatie");
    if (errors) {
        response.status(400).send({
            message: "Following field(s) are mandatory:" + errors.concat()
        });
        return;
    }

    // every kassa has his own unique id
    kassa.id = uuid.v4();
    // kassa is stored in the data store 'dal'
    dal.saveKassa(kassa);
    // overwrite the default httpstatus (200) 
    response.status(201).location("../kassa/" + kassa.id).send();
});

// a GET on /kassa_rapport/:id
app.get("/kassa_rapport/:id", function(request, response) {
    var kassa_rapport = dal.findKassaRapport(request.params.id);
    if (kassa_rapport) {
        response.send(kassa_rapport);
    } else {
        response.status(404).send();
    }
});
// a GET on /verkoop/:id
app.get("/verkoop/:id", function(request, response) {
    var verkoop = dal.findVerkoop(request.params.id);
    if (verkoop) {
        response.send(verkoop);
    } else {
        response.status(404).send();
    }
});
// the server starts on localhost:456789
app.listen(456789);

// confirmation
console.log("Server started");
