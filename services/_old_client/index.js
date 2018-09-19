var choo = require('choo')
var devtools = require('choo-devtools')

var authStore = require('./stores/auth.store')
var postStore = require('./stores/post.store')
var topicStore = require('./topic/topic.store')
var alertStore = require('./alerts/alerts.store')
var router = require('./router')
var steem = require('./services/steem.service')

if (require.main === module) {
  var app = getApp()

  app.mount('body')
} else {
  module.exports = getApp
}

function getApp () {
  var app = choo()

  steem.start({
    url: process.env.STEEMD_URL,
    addressPrefix: process.env.ADDRESS_PREFIX,
    chainId: process.env.CHAIN_ID,
    parentPost: {
      author: process.env.APP_ACCOUNT,
      permlink: process.env.APP_ACCOUNT + '-topics'
    }
  })

  app.use(devtools())
  app.use(router)
  app.use(authStore)
  app.use(postStore)
  app.use(topicStore)
  app.use(alertStore)

  return app
}