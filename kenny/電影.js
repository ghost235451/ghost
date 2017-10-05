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
      st.theater = home/
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