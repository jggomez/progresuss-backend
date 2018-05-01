
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const addictionController = require('./components/psychologicalTest/addiction/controllers/addictionController.js');
const depressionController = require('./components/psychologicalTest/depression/controllers/depressionController.js');
const anxietyController = require('./components/psychologicalTest/anxiety/controllers/anxietyController.js');
const utils = require('./components/util/Utility.js');
const express = require('express');
const cors = require('cors');

//initialize variables
const app = express();
const util = new utils.Utility();
app.use(cors());
admin.initializeApp();

app.post('/v1/addiction', (req, res, next) => {
    addictionController.handler(req, res, next);
});

app.post('/v1/depression', (req, res, next) => {
    depressionController.handler(req, res, next);
});

app.post('/v1/anxiety', (req, res, next) => {
    anxietyController.handler(req, res, next);
});

app.use((err, req, res, next) => {
    console.error(err);
    util.logErrorFirebase(admin, err);
    return res.status(500).json({ "responseCode": 500, "responseTypeError": err.name, "responseError": err.message });
});

// Functions
exports.apiresulttestaddiction = functions.https.onRequest(app);

exports.apiresulttestdepression = functions.https.onRequest(app);

exports.apiresulttestanxiety = functions.https.onRequest(app);



