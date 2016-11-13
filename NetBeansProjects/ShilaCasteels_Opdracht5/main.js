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
    response.send(dal.allelocaties());
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
    var errors = validation.fieldsNotEmpty(locatie, "locatie_id", "pauze_id", "pauze_tijd", "klas", "aantal_studenten_in_klas");
    if (errors) {
        response.status(400).send({
            message: "Following pauze_id does not excist, please create one in resource pauze" + errors.concat()
        });
        return;
    }

    // id must be unique
    var existingLocatie = dal.findlocatie(device.mac_address_device);
    if (existingDevice) {
        response.status(409).send({
            message: "id must be unique, it's already registered",
            link: "../devices/" + existingDevice.id
        });
        return;
    }

    // every device has his own unique id
    device.id = uuid.v4();
    // device is stored in the data store 'dal'
    dal.saveDevice(device);
    // overwrite the default httpstatus (200) 
    response.status(201).location("../devices/" + device.id).send();
});


// a GET on /alarms
app.get("/alarms", function(request, response) {
    // response with all available devices 
    response.send(dal.AllAlarms());
});

// a GET on /alarms/:id
app.get("/alarms/:id", function(request, response) {
    var device = dal.findAlarm(request.params.id);
    if (device) {
        response.send(device);
    } else {
        response.status(404).send();
    }
});

// a POST on /alarms
app.post("/alarms", function(request, response) {
    // only data that matches with the variable 
    var alarm = request.body;

    // fill in the mandatory field(s)
    var errors = validation.fieldsNotEmpty(alarm, "name_drone", "location", "type_alarm", "time_alarm", "notification", "important_alarm");
    if (errors) {
        response.status(400).send({
            message: "Following field(s) are mandatory:" + errors.concat()
        });
        return;
    }

    // every device has his own unique id
    alarm.id = uuid.v4();
    // device is stored in the data store 'dal'
    dal.saveAlarm(alarm);
    // overwrite the default httpstatus (200) 
    response.status(201).location("../alarms/" + alarm.id).send();
});

// a GET on /whitelists
app.get("/whitelists", function(request, response) {
    // response with all available devices 
    response.send(dal.AllWhitelists());
});

// a GET on /whitelists/:id
app.get("/whitelists/:id", function(request, response) {
    var whitelist = dal.findWhitelist(request.params.id);
    if (whitelist) {
        response.send(whitelist);
    } else {
        response.status(404).send();
    }
});

// a POST on /whitelists
app.post("/whitelists", function(request, response) {
    // only data that matches with the variable 
    var whitelist = request.body;

    // fill in the mandatory field(s)
    var errors = validation.fieldsNotEmpty(whitelist, "function", "mac_address_device", "type_device");
    if (errors) {
        response.status(400).send({
            message: "Following field(s) are mandatory:" + errors.concat()
        });
        return;
    }

    // every device has his own unique id
    whitelist.id = uuid.v4();
    // device is stored in the data store 'dal'
    dal.saveWhitelist(whitelist);
    // overwrite the default httpstatus (200) 
    response.status(201).location("../whitelists/" + whitelist.id).send();
});

// the server starts on localhost:456789
app.listen(456789);

// confirmation
console.log("Server started");
