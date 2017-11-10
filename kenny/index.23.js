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
// _usa();
_japan();
// _bot();

var app = express(); //建立express實體，將express初始化，去NEW一個express，變數app才是重點。
var linebotParser = bot.parser();
app.post('/', linebotParser);  //路徑 

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", po。rt);
});


// function _bot() {
  // bot.on('message', function(event) {
    // if (event.message.type == 'text') {
      // var msg = event.message.text;
      // var replyMsg = '';
      // if (msg.indexOf('PM2.5') != -1) {
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
//   // clearTimeout(timer);
//   getJSON('http://opendata2.epa.gov.tw/AQX.json', function(error, response) {
//     response.forEach(function(e, i) {
//       pm[i] = [];
//       pm[i][0] = e.SiteName;
//       pm[i][1] = e['PM2.5'] * 1;
//       pm[i][2] = e.PM10 * 1;
//     });
//   });
//   // timer = setInterval(_getJSON, 1800000); //每半小時抓取一次新資料
// }


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
    url: "view-source:https://www.huashan1914.com/w/huashan1914/exhibition",
    method: "GET"
  }, function(error, response, body) {
    if (error || !body) {
      return;
    } else {
      var $ = cheerio.load(body);
      var target = $("card-text-name");
      // console.log(target[14].children[0].data);
      var jp = target[5].data;
      // var jp2 = target[0].children[0].data;
      // if (jp > 0) {
      	bot.on('message',function(event){
      		event.reply('現在日幣匯率' + jp);
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

// var HOST = 'http://www.atmovies.com.tw/';

// var getPage = function(url, callback, links) {
//     var links = links || []; 
//     request(url, function(err, res, body) {
//         if (!err && res.statusCode == 200) {
//             var lastPage;
//             var $ = cheerio.load(body); 
// 			//得到全部 page 的 URL
//             $('div > div:nth-child(3) > div > ul > li > a').each(function(i, e) { 
//                 links.push($(e).attr('href'));
//             });
//             callback(links);
//         }
//     });
// };

// //利用遞迴(recursion)的觀念
// function _usa(){
// var getArticle = function(links, callback, contents) {
//     contents = contents || [];
//     if (links.length === 0) {
// 		//遞迴(recursion)結束
//         callback(contents);
//     }
//     request(HOST + links[0], function(err, res, body) {
//         if (!err && res.statusCode === 200) {
//             //console.log(body); 
//             var $ = cheerio.load(body);
//             $('article.box.post').each(function(i, e) {
//                 movie = $(e).find('.filmTitle').text(
//                 movie = movie.replace(/\s+/g, " "); // 移除 前後中 多餘的空格
//                 //console.log("movie:" + movie);
				
//                 url = $(e).find('.filmTitle a').attr('href')
//                 //console.log("url:" + url);
				
//                 descri = $(e).find('p').text()
//                 //console.log("descri:" + descri);
				
//                 $('.openthis').remove(); // 移除 class openthis	，避免	infor 抓取到多於字串
// 				//console.log($(e).html())
				
//                 infor = $(e).find('span.date').first().text()
//                 infor = infor.replace(/\s+/g, " ");
//                 //console.log("infor:" + infor);
//                 //console.log("===========");

//                 var article = {
//                     movie: movie,
//                     url: HOST + url,
//                     descri: descri,
//                     infor: infor
//                 };
//                 bot.on('message',function(event){
//                 event.reply(article);
//             });
//             });
//             links = links.slice(1);
//             getArticle(links, callback, contents);
//         }
//     });
// };
// }


// console.log("爬蟲開始......");
// getPage('http://www.atmovies.com.tw/movie/next/0/', function(links) {
//     getArticle(links, function(contents) {
//         fs.writeFile('movie_result.json', JSON.stringify(contents, null, '\t'), function(err) {
//             if (err) {
//                 return console.error(err);
//             }
// 			console.log("抓取結束");
//         });
//     });
// });



