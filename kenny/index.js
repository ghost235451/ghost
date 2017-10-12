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

// var timer;
// var pm = [];
// _getJSON();

// _bot();
// const app = express();
// const linebotParser = bot.parser();
// app.post('/', linebotParser);

// //因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
// var server = app.listen(process.env.PORT || 8080, function() {
//   var port = server.address().port;
//   console.log("App now running on port", port);
// });

// function _bot() {
//   bot.on('message', function(event) {
//     if (event.message.type == 'text') {
//       var msg = event.message.text;
//       var replyMsg = '';
//       if (msg.indexOf('PM2.5') != -1) {
//         pm.forEach(function(e, i) {
//           if (msg.indexOf(e[0]) != -1) {
//             replyMsg = e[0] + '的 PM2.5 數值為 ' + e[1];
//           }
//         });
//         if (replyMsg == '') {
//           replyMsg = '請輸入正確的地點';
//         }
//       }
//       if (replyMsg == '') {
//         replyMsg = '不知道「'+msg+'」是什麼意思 :p';
//       }

//       event.reply(replyMsg).then(function(data) {
//         console.log(replyMsg);
//       }).catch(function(error) {
//         console.log('error');
//       });
//     }
//   });

// }

// function _getJSON() {
//   clearTimeout(timer);
//   getJSON('http://opendata2.epa.gov.tw/AQX.json', function(error, response) {
//     response.forEach(function(e, i) {
//       pm[i] = [];
//       pm[i][0] = e.SiteName;
//       pm[i][1] = e['PM2.5'] * 1;
//       pm[i][2] = e.PM10 * 1;
//     });
//   });
//   timer = setInterval(_getJSON, 1800000); //每半小時抓取一次新資料
// }	  


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



