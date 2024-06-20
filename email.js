const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'juangamerospina@gmail.com',
      pass: 'yxmu qooh nlvp xhfy'
    }
  });


  // Función para enviar correo electrónico
 function enviarCorreo(bot, chatId, to) {
    console.log(to);
    const mailOptions = {
      from: 'juangamerospina@gmail.com',
      to: to,
      subject: 'prueba bot',
      text: 'esto es prueba y error'
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        bot.sendMessage(chatId, 'Ocurrió un error al enviar el correo.');
      } else {
        console.log('Email sent: ' + info.response);
        bot.sendMessage(chatId, 'Correo enviado correctamente.');
      }
    });
  }

  module.exports = { enviarCorreo };