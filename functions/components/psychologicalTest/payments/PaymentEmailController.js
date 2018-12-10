
const bpUser = require('./../user/domain/BPUser.js');
const userDAO = require('./../user/data/UserDAO.js')
const paymentEmail = require('./PaymentEmail.js');

exports.handler = (dataSnapshot) => {

    console.log(`Pago realizado`);

    const objPaymentEmail = new paymentEmail.PaymentEmail(
        new bpUser.BPUser(
            new userDAO.UserDAO()
        )
    );

    return objPaymentEmail.sendPaymentToEmail(
        dataSnapshot.data().idUser,
        dataSnapshot.data().therapeuticPackage,
        dataSnapshot.data().numSessions
    ).catch(err => {
            console.error(err);
        });



}