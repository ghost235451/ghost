var express = require('express'); //require為使用模組
var bodyParser = require('body-parser');
var linebot = require('linebot'); 
var mongodb = require('mongodb'); //使用模組mongodb
var apiai = require('apiai');
var request = require('request');

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

 const googleMapsClient = require('@google/maps').createClient({ key:AIzaSyDVuqN1isHa_YtDklDQ2Lxxov4kSLq_-vI})
  const payload = {
    origins,
    destinations,
    units: 'metric',
    language: 'zh-TW'
  }
  const GoogleMapPromise = new Promise((resolve, reject) => {
    googleMapsClient.distanceMatrix(payload, (err, res) => {
      if (!err) {
        console.log('Google Distance Matrix Response', JSON.stringify(res.json))
        const distanceMatrix = res.json.rows[0].elements 
        // ...

        resolve(distanceMatrix)
      }
    })
  })
  
  getShowtimes(home/).then((showtime) => {
      let showtime_info = {}
      let st = new Showtime()
      st.cinema = cinema.cinemaName
      st.theater = home/
      try {
        showtime_info = JSON.stringify(showtime)
      } catch(err) {
        console.log(`${theaterId} error: ${err}`)
      }
      st.showtime_info = showtime_info
      st.save((err) => {
        if(err) {
          ErrorLogger(res, err.message, 'Failed to create new showtime.')
          console.log(`Save theater${theaterId} into DB Error`)
        } else {
          console.log(`[${theaterId}] save success`)
        }
      })
  })
  
import Crawler from 'js-crawler'
import Cheerio from 'cheerio'
import _ from 'lodash'
import Promise from 'promise'

var fs = require('fs'),
    request = require('request'),
    cheerio = require('cheerio');

var HOST = 'http://www.atmovies.com.tw/home/';

var getPage = function(url, callback, links) {
    var links = links || []; 
    request(url, function(err, res, body) {
        if (!err && res.statusCode == 200) {
            var lastPage;
            var $ = cheerio.load(body); 
			//得到全部 page 的 URL
            $('div > div:nth-child(3) > div > ul > li > a').each(function(i, e) { 
                links.push($(e).attr('href'));
            });
            callback(links);
        }
    });
};

getShowtimes(theaterId).then((showtime) => {
      let showtime_info = {}
      let st = new Showtime()
      st.cinema = cinema.cinemaName
      st.theater = theaterId
      try {
        showtime_info = JSON.stringify(showtime)
      } catch(err) {
        console.log(`${theaterId} error: ${err}`)
      }
      st.showtime_info = showtime_info
      st.save((err) => {
        if(err) {
          ErrorLogger(res, err.message, 'Failed to create new showtime.')
          console.log(`Save theater${_theaterId} into DB Error`)
        } else {
          console.log(`[${theaterId}] save success`)
        }
      })
  })
import Crawler from 'js-crawler'
import Cheerio from 'cheerio'
import _ from 'lodash'
import Promise from 'promise'

crawler.crawl({
  url: `http://www.vscinemas.com.tw/visPrintShowTimes.aspx?cid=${_theaterId}&visLang=2`,

  success: (page) => {
    const html = page.content.toString()
    const $ = Cheerio.load(html)
    let tables = $('.PrintShowTimesFilm').parent().parent().parent().find('table')
    let showtimes = []
    _.map(tables, (table, idx) => {
      let title = $(table).find('.PrintShowTimesFilm').text()
        // ...

    })
    resolve(showtimes)
  },
  failure: (page) => {
    console.log(`Get Showtimes Failed on theater: ${_theaterId}`)
    reject([])
  }
})

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







