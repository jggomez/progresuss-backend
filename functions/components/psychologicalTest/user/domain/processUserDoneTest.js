const EmailManager = require('../../../util/Email.js')
const admin = require('firebase-admin')
const functions = require('firebase-functions')
const hubSpot = require('../../../util/HubSpotHelper.js')

const userEmail = functions.config().configuration.email
const passwordEmail = functions.config().configuration.password

exports.handler = (dataSnapshot) => {
  return sendEmailUserDoneTest(dataSnapshot.data()).then(() => {
    return sendUserToCRM(dataSnapshot.data())
  })
}

function sendUserToCRM (user) {
  const hubSpotHelper = new hubSpot.HubSpotHelper()
  return hubSpotHelper.createUser(
    user.name,
    user.lastName,
    user.email,
    user.phone,
    user.city
  )
}

function sendEmailUserDoneTest (user) {
  const refConf = admin
    .firestore()
    .collection('settings')
    .doc('emails')

  return refConf.get().then(conf => {
    const to = conf.data().emailRegisterUsers
    const from = conf.data().emailFrom

    const textHtml = `<p>Hola, Por favor contactar!,
    Datos del usuario que realizo el test: <br/> <br/> 
    Nombres: ${user.name}<br/> 
    Apellidos: ${user.lastName}<br/>     
    Número de Celular: ${user.phone}<br/>
    Email: ${user.email}<br/> 
    Genero: ${user.gender}<br/> 
    Fecha Nacimiento: ${user.birthDate}<br/> 
    Ciudad: ${user.city}<br/>      
    Pais: ${user.country}<br/><br/>     
    
    Gracias.<p>`

    const objEmail = new EmailManager.Email(userEmail, passwordEmail)

    return objEmail.sendEmail(
      from,
      to,
      '',
      'Progressus - Usuario que realizo un test',
      textHtml
    )
  })
}
