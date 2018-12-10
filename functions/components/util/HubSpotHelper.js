const requestAPI = require('request')
const functions = require('firebase-functions')

const claveapihubspot = functions.config().configuration.claveapihubspot

class HubSpotHelper {
  createUser (firstname, lastname, email, phone, city) {
    return requestAPI.post(
      {
        headers: {
          'content-type': 'application/json'
        },
        url:
          `https://api.hubapi.com/contacts/v1/contact/?hapikey=${claveapihubspot}`,
        body: JSON.stringify({
          properties: 
          [
            {
              property: 'email',
              value: email
            },
            {
              property: 'firstname',
              value: firstname
            },
            {
              property: 'lastname',
              value: lastname
            },
            {
              property: 'phone',
              value: phone
            },
            {
              property: 'city',
              value: city
            }
          ]
        })
      },
      (error, response, body) => {
        if (error) {
          return console.error(error)
        }
        return console.log(JSON.parse(body))
      }
    )
  }
}

exports.HubSpotHelper = HubSpotHelper
