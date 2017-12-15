var express = require('express'); //require為使用模組
var bodyParser = require('body-parser');
var linebot = require('linebot'); 
var mongodb = require('mongodb'); //使用模組mongodb
var apiai = require('apiai');
var request = require('request');
var cheerio = require("cheerio");
var getJSON = require('get-json');



/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true 
}));*/

var bot = linebot({
  "channelId": "1522726717",
  "channelSecret": "1d69960dcb17f09bb3bbd5caf820a1c5",
  "channelAccessToken": "/0HWJ3EzlNXylQ3+tC3iDdHm95e+QOhpXKy0bYf49UknQ+qobarTauYCMku/0+xgkhPe6t2MYNnYl0/9KN8hxMdi1CEVuRSQTO9NvBSL9HSDK++01uu5o6SEchXL9fS4NKODAfuLcDCZGG07jse2iQdB04t89/1O/w1cDnyilFU="
}); // 連接line，驗證

var timer;
var pm = [];
// _getJSON();
// bot.on('message',function(event){
// 	event.reply("gg");
// });
_japan();
// _bot();

var app = express(); //建立express實體，將express初始化，去NEW一個express，變數app才是重點。
var linebotParser = bot.parser();
app.post('/', linebotParser);  //路徑 

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});


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

function _getJSON() {
  // clearTimeout(timer);
  getJSON('http://opendata2.epa.gov.tw/AQX.json', function(error, response) {
    response.forEach(function(e, i) {
      pm[i] = [];
      pm[i][0] = e.SiteName;
      pm[i][1] = e['PM2.5'] * 1;
      pm[i][2] = e.PM10 * 1;
    });
  });
  // timer = setInterval(_getJSON, 1800000); //每半小時抓取一次新資料
}


// bot.on('message', function(event) {
//   if (event.message.type = 'text') {

//     var msg = event.message.text;
//   //收到文字訊息時，直接把收到的訊息傳回去
//     event.reply(msg).then(function(data) {
//     	event.reply('...');
//       // 傳送訊息成功時，可在此寫程式碼 
//       console.log(msg);
//     }).catch(function(error) {
//       // 傳送訊息失敗時，可在此寫程式碼 
//       console.log('錯誤產生，錯誤碼：'+error);
//     });
//   }
// });



function _japan() {
  // clearTimeout(timer2);
 const url = 'http://www.cwb.gov.tw/V7/forecast/taiwan/Taipei_City.htm'

request(url, (err, res, body) => {
  const $ = cheerio.load(body)
  let weathers = []
  $('#box8 .FcstBoxTable01 tbody tr').each(function(i, elem) {
    weathers.push(
      $(this)
        .text()
        .split('\n')
    )
  })

  weathers = weathers.map(weather => ({
    time: weather[1].substring(2).split(' ')[0],
    temp: weather[2].substring(2),
    rain: weather[6].substring(2),
    bot.on('message',function(event){
          event.reply(time + temp + rain);
  }))

  console.log(weathers)
})

// function _japan() {
// 	bot.on('message', function(event) {
// 	  if (event.message.type = 'text') {

// 	    var msg = event.message.text;
// 	  //收到文字訊息時，直接把收到的訊息傳回去
// 	    event.reply(msg).then(function(data) {
// 	    	event.reply('...');
// 	      // 傳送訊息成功時，可在此寫程式碼 
// 	      console.log(msg);
// 	    }).catch(function(error) {
// 	      // 傳送訊息失敗時，可在此寫程式碼 
// 	      console.log('錯誤產生，錯誤碼：'+error);
// 	    });
// 	  }
// });




