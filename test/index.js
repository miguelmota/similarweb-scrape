const test = require('tape')
const {getData} = require('../')

test('getData', t => {
  t.plan(7)

  const domain = 'github.com'

  getData(domain)
  .then(data => {
    console.log(data)
    t.ok(data.domain, 'github.com')
    t.ok(data.totalVisits)
    t.ok(data.bounceRate)
    t.ok(data.pagesPerVisit)
    t.ok(data.avgVisitDuration)
    t.ok(data.globalRank)
    t.ok(data.category)
  })
  .catch(error => {
    console.error(error)
  })
})
