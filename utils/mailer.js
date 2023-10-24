/* eslint-disable no-console */
const mailer = require('nodemailer');
const logger = require('../utils/winston-confg');
const EmailContent = require('../utils/emailContent');

const SendEmail = async (contents) => {
  try {
    const htmlContent = EmailContent(contents);

    console.log('Sending email..');
    const smpt = mailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '70cfd9147ba726',
        pass: 'a4b1e66bacd21f',
      },
    });
    const result = await smpt.sendMail({
      subject: 'Sensor Data',
      to: 'dlira@stratpoint.com',
      from: 'dlira@stratpoint.com',
      html: htmlContent,
    });
    logger.info('Email sent: ', result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = SendEmail;
