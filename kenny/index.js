var express = require('express'); //require為使用模組
var bodyParser = require('body-parser');
var linebot = require('linebot'); 
var mongodb = require('mongodb'); //使用模組mongodb
var apiai = require('apiai');
var request = require('request');
var cheerio = require("cheerio");
var getJSON = require('get-json');


// var app = express(); //建立express實體，將express初始化，去NEW一個express，變數app才是重點。

/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true 
}));*/


var bot = linebot({
  "channelId": "1522726717",
  "channelSecret": "1d69960dcb17f09bb3bbd5caf820a1c5",
  "channelAccessToken": "/0HWJ3EzlNXylQ3+tC3iDdHm95e+QOhpXKy0bYf49UknQ+qobarTauYCMku/0+xgkhPe6t2MYNnYl0/9KN8hxMdi1CEVuRSQTO9NvBSL9HSDK++01uu5o6SEchXL9fS4NKODAfuLcDCZGG07jse2iQdB04t89/1O/w1cDnyilFU="
}); // 連接line，驗證

// _japan();

bot.on('message', function(event) {
  if (event.message.type = 'text') {
    var msg = event.message.text;
    event.reply(msg).then(function(data) {
      // success 
      console.log(msg);
    }).catch(function(error) {
      // error 
      console.log('error');
    });
  }
});


// function _japan() {
//   clearTimeout(timer2);
//   request({
//     url: "http://rate.bot.com.tw/Pages/Static/UIP003.zh-TW.htm",
//     method: "GET"
//   }, function(error, response, body) {
//     if (error || !body) {
//       return;
//     } else {
//       var $ = cheerio.load(body);
//       var target = $(".rate-content-cash text-right print_hide");
//       console.log(target[0].children[0].data);
//       jp = target[0].children[0].data;
// 	  if (jp > 10) {
// 	  	bot.push('使用者 ID', '現在日幣 ' + jp + '，該買啦！');
//       }
//       timer2 = setInterval(_japan, 10000);
//     }
//   });
// }



