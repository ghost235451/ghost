var express = require('express'); //require為使用模組
var bodyParser = require('body-parser');
var linebot = require('linebot'); 
var mongodb = require('mongodb'); //使用模組mongodb
var apiai = require('apiai');
var request = require('request');
var cheerio = require("cheerio");

var app = express(); //建立express實體，將express初始化，去NEW一個express，變數app才是重點。

/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true 
}));*/

var bot = linebot({
  "channelId": "1522726717",
  "channelSecret": "1d69960dcb17f09bb3bbd5caf820a1c5",
  "channelAccessToken": "/0HWJ3EzlNXylQ3+tC3iDdHm95e+QOhpXKy0bYf49UknQ+qobarTauYCMku/0+xgkhPe6t2MYNnYl0/9KN8hxMdi1CEVuRSQTO9NvBSL9HSDK++01uu5o6SEchXL9fS4NKODAfuLcDCZGG07jse2iQdB04t89/1O/w1cDnyilFU="
}); // 連接line，驗證

bot.on('message', function(event) {
  if (event.message.type = 'text') {
  	request({
    url: "http://blog.infographics.tw",
    method: "GET"
  }, function(e,r,b) {
    if(e || !b) { return; }
    var $ = cheerio.load(b);
    var result = [];
    var titles = $("li.item h2");
    for(var i=0;i<titles.length;i++) {
      result.push($(titles[i]).text());
    }
    event.reply("result.json", JSON.stringify(result));
  });
  }
});


// bot.on('message', function(event) {
//   if (event.message.type = 'text') {
//   	_japan();
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



var linebotParser = bot.parser();
app.post('/', linebotParser);  //路徑 


//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});



// var jp = function() {
//   request({
//     url: "http://rate.bot.com.tw/Pages/Static/UIP003.zh-TW.htm",
//     method: "GET"
//   }, function(error, response, body) {
//     if (error || !body) {
//       return;
//     }else{

//     // 爬完網頁後要做的事情
//         console.log(body);
//     }
//   });
// };

// function _japan() {
//   // clearTimeout(timer2);
//   request({
//   	url: "http://rate.bot.com.tw/Pages/Static/UIP003.zh-TW.htm",
//     method: "GET"
//   }, function(error, response, body) {
//     if (error || !body) {
//     	var gg ='GG';
//     	return gg;
//     } else {
//     	var $ = cheerio.load(body);
//         var target = $(".rate-content-cash text-right print_hide");
//         console.log(target[0].children[0].data);
//         var jp = target[0].children[0].data;
//         // var jp ='fuck';
        

//         bot.push('使用者 ID', '現在日幣 ' + jp + '，該買啦！');

//       // timer2 = setInterval(_japan, 1000);
//     }
//   });
}




