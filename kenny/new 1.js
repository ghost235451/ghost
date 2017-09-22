let app = express()
const server = require('http').Server(app)
let bot = LINEBot.create({
  channelID:'1522726717',
  channelSecret:'1d69960dcb17f09bb3bbd5caf820a1c5',
  channelToken:'/0HWJ3EzlNXylQ3+tC3iDdHm95e+QOhpXKy0bYf49UknQ+qobarTauYCMku/0+xgkhPe6t2MYNnYl0/9KN8hxMdi1CEVuRSQTO9NvBSL9HSDK++01uu5o6SEchXL9fS4NKODAfuLcDCZGG07jse2iQdB04t89/1O/w1cDnyilFU='
}, server)

app.use(bot.webhook('/webhook'))

  const googleMapsClient = require('@google/maps').createClient({ key: _GOOGLE_MAP_API_KEY })
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
