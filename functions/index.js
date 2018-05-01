
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const addictionController = require('./components/psychologicalTest/controllers/psychologicalTestController.js');
const utils = require('./components/util/Utility.js');
const express = require('express');
const cors = require('cors');

//initialize variables
const app = express();
const util = new utils.Utility();
app.use(cors());
admin.initializeApp();

app.post('/v1/resultpsychologicaltest', (req, res, next) => {
    addictionController.handler(req, res, next);
});

app.use((err, req, res, next) => {
    console.error(err);
    util.logErrorFirebase(admin, err);
    return res.status(500).json({ "responseCode": 500, "responseTypeError": err.name, "responseError": err.message });
});

// Functions
exports.apipsychologicaltest = functions.https.onRequest(app);


