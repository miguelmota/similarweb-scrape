# similarweb-scrape

> Scrapes [SimilarWeb](https://www.similarweb.com/) site to get analytics for domain.

NOTE: Due to SimilarWeb's bot detection, this will only work for a very few number of requests. Only use this for experimenting. Do not use this for production. Also, this module will most likely break in the future when SimilarWeb updates their DOM selectors.

## Install

```bash
npm install similarweb-scrape
```

## Usage

```node.js
const {getData} = require('similarweb-scrape')

const domain = 'github.com'

getData(domain)
.then(data => {
  console.log(data)

  /*
  {
    domain: 'github.com',
    totalVisits: '387.76M',
    avgVisitDuration: '00:06:10',
    pagesPerVisit: '6.63',
    bounceRate: '41.63%',
    globalRank: '78',
    category: 'Computer and Electronics > Software' }
  }
  */
})
.catch(error => {
  console.error(error)
})
```

## Test

```bash
npm test
```

## License

MIT
