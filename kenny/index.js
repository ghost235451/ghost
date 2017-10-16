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
	_japan();
  if (event.message.type = 'text') {
    var msg = event.message.text;
  //收到文字訊息時，直接把收到的訊息傳回去
    event.reply(msg).then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
      console.log(msg);
    }).catch(function(error) {
      // 傳送訊息失敗時，可在此寫程式碼 
      console.log('錯誤產生，錯誤碼：'+error);
    });
  }
});

/*bot.on('message', function(event) {
  console.log(event); //把收到訊息的 event 印出來看看
});*/

var linebotParser = bot.parser();
app.post('/', linebotParser);  //路徑 

var api = apiai("96499911855b40b29cc7908eca2ed768");
 
 var request = api.textRequest('text', {
    sessionId: 'Jason'
});

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
})
 
request.end();

/*app.post('/webhook', function(req, res) {
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'weather'
    });
});*/
var mongodbURL =
'mongodb://LinYuCheng:a0936662285@ds143081.mlab.com:43081/jasondatabase'; //將MongoDB的位置在Server程式碼中以一個變數儲存

var myDB; //建立一個全域變數myDB
mongodb.MongoClient.connect(mongodbURL, function(err, db){ //使用mongodb.MongoClient的方法connect()進行連線
	if(err){                                               //事件監聽器用在非同步程式碼，不確定何時會用到
		console.log(err);                                  //若回傳的參數有error，用console.log()印出錯誤內容
	} else{
		myDB = db;                                         //在mongoDB成功連線後，留住db物件
		console.log('connection success');                 //若沒有錯誤表示連線成功，印出connection success
	}
});

app.get('/database', function(request, response){ //連接到/database才會做的事情，request帶有連接進來的資訊(參數)，response為回傳的內容。
	var collection = myDB.collection('data'); //使用myDB的方法collection('data')取得data這個collection
	collection.find({}).toArray(function(err, docs){ //使用collection的方法find()取得資料表內的內容，{}表示取得全部內容
		if(err){                                     //使用toArray()將資料轉成陣列，function的docs是轉成陣列後的結果
			response.status(406).end();              //轉陣列過程若有err，回傳給錯誤碼406，此為Http協定狀態碼      
		} else{                                      //.end()為將資料回傳給使用者
			response.type('application/json');       //沒有錯誤回傳狀態碼200並附帶著資料，因為MongoDB存的資料就是JSON，所以不用特別轉換
			response.status(200).send(docs);
			response.end();
		}
   });
});

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

function _japan() {
  // clearTimeout(timer2);
  request({
  	url: "http://rate.bot.com.tw/Pages/Static/UIP003.zh-TW.htm",
    method: "GET"
  }, function(error, response, body) {
    if (error || !body) {
    	bot.push('GG');
    	return;
    } else {
    	var $ = cheerio.load(body);
        var target = $(".rate-content-cash text-right print_hide");
        console.log(target[0].children[0].data);
        var jp = target[0].children[0].data;

        bot.push('使用者 ID', '現在日幣 ' + jp + '，該買啦！');

      // timer2 = setInterval(_japan, 1000);
    }
  });
}




