/* eslint-disable no-console */
const mailer = require('nodemailer');
const logger = require('../utils/winston-confg');
const EmailContent = require('../utils/emailContent');

const SendEmail = async (contents) => {
  try {
    const htmlContent = EmailContent(contents);

    console.log('Sending email..');
    const smpt = mailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
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
