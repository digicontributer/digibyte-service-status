const nodemailer = require('nodemailer');
const config = require('../config/');
const logger = require('../config/logger');

const sendOfflineServiceEmail = async (service) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: 'smtp.googlemail.com', // Gmail Host
      port: 465, // Port
      secure: true, // this is true as port is 465
      auth: {
          user: config.gmailUsername, //Gmail username
          pass: config.gmailPassword // Gmail password
      }
    });
    let mailOptions = {
      from: `"DigiByte Developer" <dev@digibyte.io>`,
      to: service.maintainer,
      subject: `${service.url} offline`,
      text: `The service you maintain at ${service.url} is currently offline`
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return reject(err);
      }
      logger.info(`We sent an email notifying ${service.maintainer} that ${service.url} is currently offline`);
      resolve(info);
    });
  });
}

module.exports = {
  sendOfflineServiceEmail
}