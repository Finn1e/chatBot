const { Telegraf } = require('telegraf');
const axios = require(`axios`);

const bot =new Telegraf(`5125927478:AAEL6fVCbup3LbQS7CeAZsSKRfJszJ4HQPg`)

bot.on(`text`, function(ctx) {
 //ctx.reply(` Привет `);
 console.log(`text получен ` + ctx.message.text);
  axios.get(`https://api.openweathermap.org/data/2.5/weather` , {
    params: {
        q:ctx.message.text,
        appid: '0bc377195d931c1d69a424a908a2a7af',
        units: 'metric'
    } 
  }).then(function(response)
  {
    ctx.reply(response.data.name + ' температура сейчас: ' + Math.round(response.data.main.temp) + ' , ощущается как: ' + Math.round(response.data.main.feels_like)) 
  })
})
bot.launch();