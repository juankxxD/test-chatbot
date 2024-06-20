// const TelegramBot = require('node-telegram-bot-api');
// const { enviarCorreo } = require('./email');

// // Reemplaza 'YOUR_TELEGRAM_BOT_TOKEN' con el token que obtuviste de BotFather
// const token = '7005393352:AAHj_eVkEXO_ksK-uArREMVgNWuBcyw0alU';

// Crea un bot que usa 'polling' para obtener nuevas actualizaciones
// const bot = new TelegramBot(token, { polling: true });
// let userSteps = {};
// // Manejar el evento 'message'
// bot.on('message', (msg) => {
//     try{

//         const chatId = msg.chat.id;
//         const text = msg.text.toLowerCase();
      
//         console.log(text);
      
//         if (text.includes('hola')) {
//           bot.sendMessage(chatId, '¡Hola! ¿Cómo puedo ayudarte?');
//         } else if (text.includes('reservar')) {
//           bot.sendMessage(chatId, 'Claro, ¿para qué fecha y hora te gustaría reservar tu cita?');
//         } else if (text.includes('enviar correo')) {
//           bot.sendMessage(chatId, 'Por favor, proporciona el nombre de la persona a la que deseas enviar el correo:');
//           userSteps[chatId] = 'waiting_for_name';
//         } else if (userSteps[chatId] === 'waiting_for_name') {
//           const name = text;
//           enviarCorreo(bot, chatId, name);
//           delete userSteps[chatId]; // Reset the state for the user
//         } else if (text.includes('muchachos')) {
//           bot.sendMessage(chatId, 'Nicolas y dlaa, bot creado jeje');
//         } else {
//           bot.sendMessage(chatId, 'Lo siento, no entiendo tu mensaje en este momento.');
//         }
//     } catch(e) {
//         console.log(e);
//     }
//   });



const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('', (req, res) => {
    res.json({
        ok: true,
        msg: 'Funciono melo'
    })
})

app.post('/webhook', (req, res) => {
  const message = req.body;
  const text = message.text.body; // Obtén el texto del mensaje

  let response;
  if (text === 'Hola') {
      response = '¡Hola! ¿Cómo puedo ayudarte hoy?';
  } else {
      response = 'Lo siento, no entiendo tu mensaje.';
  }

  // Envía la respuesta usando la API de WhatsApp
  sendMessage(message.from, response);

  res.sendStatus(200);
});

function sendMessage(to, text) {
  const axios = require('axios');
  axios.post('https://graph.facebook.com/v19.0/344980988700663/messages', {
      messaging_product: 'whatsapp',
      to: to,
      text: { body: text }
  }, {
      headers: {
          'Authorization': 'Bearer EAAGTdpyLJv0BOzY1YKxk6ThnGZAMnQDMG11KZCguHgUs7jzk56cnZCcUkhgG1QMX8VdPe04kttDkJzK5tlkrhZAvLJOujthDT8T8Rr4xgEHInL0ZAbDNe0BKlbuXgvSPPJED6Iy3URPMGEl46rDvN0lCzjiOIfRo6zGjD7CaEpxYZBk5dejIkHZBWQZBkliBzuzEXfZCMFAW2TXmt8zzZB8wZDZD',
          'Content-Type': 'application/json'
      }
  }).then(response => {
      console.log('Mensaje enviado:', response.data);
  }).catch(error => {
      console.error('Error enviando mensaje:', error);
  });
}

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
