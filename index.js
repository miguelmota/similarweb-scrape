const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

const file = 'cookie.txt'
let cookie = fs.readFileSync(file).toString()

function getData (domain) {
  return new Promise((resolve, reject) => {
    request({
      url: `https://www.similarweb.com/website/${domain}`,
      headers: {
        Host: 'www.similarweb.com',
        Referer: `https://www.similarweb.com/website/${domain}`,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
        'Upgrade-Insecure-Requests': 1,
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        Pragma: 'no-cache',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.8,es;q=0.6',
        Cookie: cookie
      }
    }, (error, response, body) => {
      if (error) {
        return reject(error)
      }

      const data = {
        domain: domain,
        totalVisits: '',
        avgVisitDuration: '',
        pagesPerVisit: '',
        bounceRate: '',
        globalRank: '',
        category: ''
      }

      if (!body) {
        return resolve(data)
      }

      if (response.headers.cookie) {
        cookie = response.headers['set-cookie']
        fs.writeFile(file, cookie, () => {})
      }

      const $ = cheerio.load(body)

      data.globalRank = $('[data-rank-subject="Global"] [data-value]').html()
      data.category = $('[data-rank-subject="Category"] .rankingItem-subTitle').html()
      data.totalVisits = $('[data-type="visits"] .engagementInfo-valueNumber').html()
      data.avgVisitDuration = $('[data-type="time"] .engagementInfo-valueNumber').html()
      data.pagesPerVisit = $('[data-type="ppv"] .engagementInfo-valueNumber').html()
      data.bounceRate = $('[data-type="bounce"] .engagementInfo-valueNumber').html()

      if (data.category) {
        data.category = data.category.replace('&gt;', '>')
      }

      if (!data.globalRank) {
        fs.writeFile(file, '', () => {})
      }

      resolve(data)
    })
  })
}

module.exports = {
  getData
}
