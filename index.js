const { Telegraf } = require("telegraf");
const axios = require(`axios`);

const bot = new Telegraf(`5125927478:AAEL6fVCbup3LbQS7CeAZsSKRfJszJ4HQPg`);

bot.on(`text`, function (ctx) {
  console.log(`text получен ` + ctx.message.text);
  axios
    .get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: ctx.message.text,
        appid: "0bc377195d931c1d69a424a908a2a7af",
        units: "metric",
        lang: "ru",
      },
    })
    .then(function (response) {
      response.data.name === "Нижний Новгород" // строгое сравнение дольше не строгого?Уточнить
        ? ctx.reply(` Привет,родничок 👍`)
        : ctx.reply(`Не уважаю,🐒,но `);
      let answerOfApi = () => {
        ctx.reply(
          `В ${response.data.name} температура сейчас: ${Math.round(
            response.data.main.temp
          )}°, ощущается как: ${Math.round(
            response.data.main.feels_like
          )}° \nСкорость ветра: ${response.data.wind.speed} м/с`
        );
      };
      setTimeout(answerOfApi, 1000);
    })
    .catch((error) => {
      if (ctx.message.text.length <= 100)
        ctx.reply("Такого города нет, попробуйте написать конкретнее");
      console.log("Ошибка", error);
    });
});
bot.launch();

// // StickerBot.js
// var TelegramBot = require("node-telegram-bot-api");

// var token = "5125927478:AAEL6fVCbup3LbQS7CeAZsSKRfJszJ4HQPg";
// var botOptions = {
//   polling: true,
// };
// var bot = new TelegramBot(token, botOptions);

// var stickersList = [
//   "CAACAgIAAxkBAAEERrliPxb3sZjsITlVrxmiQcBsTQWUVwACwRcAAhiJsEk-mOTloWXGziME",
//   "AAMCAgADGQEAAgTkYkYnxklRTWsq_YajDhpL5dXkD2gAApMUAALWd_FIvZHH1KjgfMkBAAdtAAMjBA",
//   "AAMCAgADGQEAAgTmYkYn32rkAAHmaW-k8dlh54-cLicMAAKsEgACUijxSHsg2mzlHQ7wAQAHbQADIwQ",
//   "CAACAgIAAxkBAAIE6mJGKAuTJ6HgZdujptadvjYkfLcCAAJcFQACErcBSv_i0WB5upw8IwQ",
//   "CAACAgIAAxkBAAIE7WJGKBe8d_nmgQbSn098LAX9RmQFAAIQFAACPqmpSV4ema9NYk88IwQ",
// ];

// bot.on("sticker", function (msg) {
//   var messageChatId = msg.chat.id;
//   var messageStickerId = msg.sticker.file_id;
//   var messageDate = msg.date;
//   var messageUsr = msg.from.username;

//   sendStickerByBot(
//     messageChatId,
//     stickersList[getRandomInt(0, stickersList.length)]
//   );

//   console.log(msg);
// });

// function getRandomInt(aMin, aMax) {
//   return Math.floor(Math.random() * (aMax - aMin + 1)) + aMin;
// }

// function sendStickerByBot(aChatId, aStickerId) {
//   bot.sendSticker(aChatId, aStickerId, { caption: "I'm a cute bot!" });
// }
