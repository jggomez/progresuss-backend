const functions = require('firebase-functions')
const admin = require('firebase-admin')
const psychologicalTestController = require('./components/psychologicalTest/controllers/psychologicalTestController.js')
const utils = require('./components/util/Utility.js')
const paymentController = require('./components/psychologicalTest/payments/PaymentEmailController.js')
const processUserDoneTest = require('./components/psychologicalTest/user/domain/processUserDoneTest.js')
const express = require('express')
const cors = require('cors')

// firebase functions:config:set configuration.email="XXXX" configuration.password="XXXXXX"
// Initialize variables
const app = express()
const util = new utils.Utility()
app.use(cors())
admin.initializeApp()

app.post('/v1/resultpsychologicaltest', (req, res, next) => {
  psychologicalTestController.handler(req, res, next)
})

app.use((err, req, res, next) => {
  console.error(err)
  util.logErrorFirebase(admin, err)
  return res.status(500).json({
    responseCode: 500,
    responseTypeError: err.name,
    responseError: err.message
  })
})

// Functions
exports.apipsychologicaltest = functions.https.onRequest(app)

exports.paymentEmail = functions.firestore
  .document('/payments/{payId}')
  .onCreate(paymentController.handler)

exports.createUserDoneTest = functions.firestore
  .document('/users/{userId}')
  .onCreate(processUserDoneTest.handler)
