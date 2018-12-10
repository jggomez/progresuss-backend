const requestAPI = require('request')

class HubSpotHelper {
  createUser (firstname, lastname, email, phone, city) {
    return requestAPI.post(
      {
        headers: {
          'content-type': 'application/json'
        },
        url:
          'https://api.hubapi.com/contacts/v1/contact/?hapikey=84bf251d-2ee6-441d-9628-062f3a3746c3',
        body: JSON.stringify({
          properties: [
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
