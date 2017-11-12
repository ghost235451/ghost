var express    = require('express');
var bodyParser = require('body-parser');
var cors       = require('cors');
var _          = require('lodash');
var Promise    = require('promise');
var LINEBot    = require('line-messaging');


var Theater    = require('../src/theater.js');
var DB         = require('../db/index.js');

var app = express();
var server = require('http').Server(app);
var bot = LINEBot.create({
  channelID: '1522726717',
  channelSecret: '1d69960dcb17f09bb3bbd5caf820a1c5',
  channelToken: '/0HWJ3EzlNXylQ3+tC3iDdHm95e+QOhpXKy0bYf49UknQ+qobarTauYCMku/0+xgkhPe6t2MYNnYl0/9KN8hxMdi1CEVuRSQTO9NvBSL9HSDK++01uu5o6SEchXL9fS4NKODAfuLcDCZGG07jse2iQdB04t89/1O/w1cDnyilFU='
}, server);
app.use(bot.webhook('/webhook'));

bot.on(LINEBot.Events.MESSAGE, function(replyToken, message) {
  console.log('user message: ', message.getText());
  var timestamp = (new Date()).toLocaleString()
  var msg = '收到你的訊息啦：[' + message.getText() + '], 我們會盡快上線，現在時間 ' + timestamp + '!!';

  bot.replyTextMessage(replyToken, message.getText()).then(function(data) {
    // add your code when success.
  }).catch(function(error) {
    // add your code when error.
  });
  // add code below.
});

app.use(cors());

// bodyParser
app.use(bodyParser.json());
app.use (function (error, req, res, next){
  //Catch bodyParser json error
  res.status(400).json({'error': "Proper JSON payload is required."});
});

app.set('port', (process.env.PORT || 3000));

// views is directory for all template files
app.set('views', __dirname + '/../src/views');
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
  res.render('index');
});

app.get('/theater', function (req, res) {
  res.json(Theater.getTheaters());
});

// app.get('/api/getListDicArea', function (req, res) {
//   Theater.getListDicArea().then(function (list, err) {
//     if (err) {
//       res.json([])
//     } else {
//       res.json(list);
//     }
//   });
// });

app.get('/theater/:theaterId', function (req, res) {
  var _theaterId = req.params.theaterId;
  var theaters = Theater.getTheaters();
  var matchTheaters = false;
  _.map(theaters, function(theater, key) {
    if (key == _theaterId) {
      matchTheaters = true;
    }
  });

  if (matchTheaters) {
    DB.getShowtimes(req.params.theaterId).then(function(t) {
      res.json(t);
    });
  } else {
    res.status(400).json({'error': "Theater id doesn't match the list."});
  }

});

app.post('/ticket', function (req, res) {
  var payload = req.body

  if (!_.has(payload, 'cinemaId')) {
    res.status(400).json({'error': "payload [cinemaId] required."});
  } else if (!_.has(payload, 'movieId')) {
    res.status(400).json({'error': "payload [movieId] required."});
  } else if (!_.has(payload, 'ticketDate')) {
    res.status(400).json({'error': "payload [ticketDate] required."});
  } else if ((new Date(payload.ticketDate)) == 'Invalid Date') {
    res.status(400).json({'error': "ticketDate is invalid."});
  } else {
    Theater.getTicketUrl(payload).then(function (urls, err) {
      if (err) {
        res.json([])
      } else {
        res.json(urls);
      }
    });
  }

});


app.get('/*', function (req, res) {
  res.redirect('/');
});

Promise.resolve()
  .then(function () {
    DB.init();
  })
  .finally(function () {
    // app.listen(app.get('port'), function() {
    //   console.log('VIESHOW crawler now running on http://localhost:' + app.get('port'));
    // });
    server.listen(app.get('port'));
  })

  var linebotParser = bot.parser();
app.post('/', linebotParser);  //路徑 

var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});


