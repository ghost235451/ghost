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


function _bot() {
  bot.on('message', function(event) {
    if (event.message.type == 'text') {
      var msg = event.message.text;
      var replyMsg = '';
      if (msg.indexOf('PM2.5') != -1) {
        pm.forEach(function(e, i) {
          if (msg.indexOf(e[0]) != -1) {
            replyMsg = e[0] + '的 PM2.5 數值為 ' + e[1];
          }
        });
        if (replyMsg == '') {
          replyMsg = '請輸入正確的地點';
        }
      }
      if (replyMsg == '') {
        replyMsg = '不知道「'+msg+'」是什麼意思 :p';
      }

      event.reply(replyMsg).then(function(data) {
        console.log(replyMsg);
      }).catch(function(error) {
        console.log('error');
      });
    }
  });

}

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
  request({
    url: "http://rate.bot.com.tw/Pages/Static/UIP003.zh-TW.htm",
    method: "GET"
  }, function(error, response, body) {
    if (error || !body) {
      return;
    } else {
      var $ = cheerio.load(body);
      var target = $(".rate-content-sight.text-right.print_hide");
      // console.log(target[14].children[0].data);
      var jp = target[14].children[0].data;
      var jp2 = target[0].children[0].data;
      // if (jp > 0) {
      	bot.on('message',function(event){
      		event.reply('現在日幣匯率' + jp +'美金' +jp2);
      	});
        // bot.reply('使用者 ID', '現在日幣 ' + jp + '，該買啦！');
      // }
      // timer2 = setInterval(_japan, 120000);
    }
  });
}

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

// var line = require('@line/bot-sdk');

// var client = new line.Client({
//   channelAccessToken: '/0HWJ3EzlNXylQ3+tC3iDdHm95e+QOhpXKy0bYf49UknQ+qobarTauYCMku/0+xgkhPe6t2MYNnYl0/9KN8hxMdi1CEVuRSQTO9NvBSL9HSDK++01uu5o6SEchXL9fS4NKODAfuLcDCZGG07jse2iQdB04t89/1O/w1cDnyilFU='
// });

// var message = {
//   type: 'text',
//   text: 'Hello World!'
// };

// client.pushMessage('<to>', message)
//   .then(() => {
//     ...
//   })
//   .catch((err) => {
//     // error handling
//   });

event.reply('Hello, world').then(function (data) {
    // success 
}).catch(function (error) {
    // error 
});
 
event.reply({ type: 'text', text: 'Hello, world' });
 
event.reply([
    { type: 'text', text: 'Hello, world 1' },
    { type: 'text', text: 'Hello, world 2' }
]);
 
event.reply({
    type: 'image',
    originalContentUrl: 'https://example.com/original.jpg',
    previewImageUrl: 'https://example.com/preview.jpg'
});
 
event.reply({
    type: 'video',
    originalContentUrl: 'https://example.com/original.mp4',
    previewImageUrl: 'https://example.com/preview.jpg'
});
 
event.reply({
    type: 'audio',
    originalContentUrl: 'https://example.com/original.m4a',
    duration: 240000
});
 
event.reply({
    type: 'location',
    title: 'my location',
    address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
    latitude: 35.65910807942215,
    longitude: 139.70372892916203
});
 
event.reply({
    type: 'sticker',
    packageId: '1',
    stickerId: '1'
});
 
event.reply({
    type: 'imagemap',
    baseUrl: 'https://example.com/bot/images/rm001',
    altText: 'this is an imagemap',
    baseSize: { height: 1040, width: 1040 },
    actions: [{
        type: 'uri',
        linkUri: 'https://example.com/',
        area: { x: 0, y: 0, width: 520, height: 1040 }
    }, {
        type: 'message',
        text: 'hello',
        area: { x: 520, y: 0, width: 520, height: 1040 }
    }]
});
 
event.reply({
    type: 'template',
    altText: 'this is a buttons template',
    template: {
        type: 'buttons',
        thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
        title: 'Menu',
        text: 'Please select',
        actions: [{
            type: 'postback',
            label: 'Buy',
            data: 'action=buy&itemid=123'
        }, {
            type: 'postback',
            label: 'Add to cart',
            data: 'action=add&itemid=123'
        }, {
            type: 'uri',
            label: 'View detail',
            uri: 'http://example.com/page/123'
        }]
    }
});
 
event.reply({
    type: 'template',
    altText: 'this is a confirm template',
    template: {
        type: 'confirm',
        text: 'Are you sure?',
        actions: [{
            type: 'message',
            label: 'Yes',
            text: 'yes'
        }, {
            type: 'message',
            label: 'No',
            text: 'no'
        }]
    }
});
 
event.reply({
    type: 'template',
    altText: 'this is a carousel template',
    template: {
        type: 'carousel',
        columns: [{
            thumbnailImageUrl: 'https://example.com/bot/images/item1.jpg',
            title: 'this is menu',
            text: 'description',
            actions: [{
                type: 'postback',
                label: 'Buy',
                data: 'action=buy&itemid=111'
            }, {
                type: 'postback',
                label: 'Add to cart',
                data: 'action=add&itemid=111'
            }, {
                type: 'uri',
                label: 'View detail',
                uri: 'http://example.com/page/111'
            }]
        }, {
            thumbnailImageUrl: 'https://example.com/bot/images/item2.jpg',
            title: 'this is menu',
            text: 'description',
            actions: [{
                type: 'postback',
                label: 'Buy',
                data: 'action=buy&itemid=222'
            }, {
                type: 'postback',
                label: 'Add to cart',
                data: 'action=add&itemid=222'
            }, {
                type: 'uri',
                label: 'View detail',
                uri: 'http://example.com/page/222'
            }]
        }]
    }

   });