var express = require('express'); //require為使用模組
var bodyParser = require('body-parser');
var mongodb = require('mongodb'); //使用模組mongodb
var linebot = require('linebot');
var apiai = require('apiai');
var request = require('request');

var app = require('express')()
const server = require('https').Server(app)
let bot = LINEBot.create({
  channelID:'1522726717',
  channelSecret:'1d69960dcb17f09bb3bbd5caf820a1c5',
  channelToken:'/0HWJ3EzlNXylQ3+tC3iDdHm95e+QOhpXKy0bYf49UknQ+qobarTauYCMku/0+xgkhPe6t2MYNnYl0/9KN8hxMdi1CEVuRSQTO9NvBSL9HSDK++01uu5o6SEchXL9fS4NKODAfuLcDCZGG07jse2iQdB04t89/1O/w1cDnyilFU='
}, server)

app.use(bot.webhook('/webhook'))

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
      st.theater = theaterId
      try {
        showtime_info = JSON.stringify(showtime)
      } catch(err) {
        console.log(`${home/} error: ${err}`)
      }
      st.showtime_info = showtime_info
      st.save((err) => {
        if(err) {
          ErrorLogger(res, err.message, 'Failed to create new showtime.')
          console.log(`Save theater${_home/} into DB Error`)
        } else {
          console.log(`[${home/}] save success`)
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

//利用遞迴(recursion)的觀念
var getArticle = function(links, callback, contents) {
    contents = contents || [];
    if (links.length === 0) {
		//遞迴(recursion)結束
        callback(contents);
    }
    request(HOST + links[0], function(err, res, body) {
        if (!err && res.statusCode === 200) {
            //console.log(body); 
            var $ = cheerio.load(body);
            $('article.box.post').each(function(i, e) {
                movie = $(e).find('.filmTitle').text()
                movie = movie.replace(/\s+/g, " "); // 移除 前後中 多餘的空格
                //console.log("movie:" + movie);
				
                url = $(e).find('.filmTitle a').attr('href')
                //console.log("url:" + url);
				
                descri = $(e).find('p').text()
                //console.log("descri:" + descri);
				
                $('.openthis').remove(); // 移除 class openthis	，避免	infor 抓取到多於字串
				//console.log($(e).html())
				
                infor = $(e).find('span.date').first().text()
                infor = infor.replace(/\s+/g, " ");
                //console.log("infor:" + infor);
                //console.log("===========");

                var article = {
                    movie: movie,
                    url: HOST + url,
                    descri: descri,
                    infor: infor
                };
                contents.push(article);
            });
            links = links.slice(1);
            getArticle(links, callback, contents);
        }
    });
};

console.log("爬蟲開始......");
getPage('http://www.atmovies.com.tw/movie/next/0/', function(links) {
    getArticle(links, function(contents) {
        fs.writeFile('movie_result.json', JSON.stringify(contents, null, '\t'), function(err) {
            if (err) {
                return console.error(err);
            }
			console.log("抓取結束");
        });
    });
});