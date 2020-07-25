import Vue from 'vue'
const dayjs = require('dayjs')
Vue.filter('toDate', function(timestamp) {
  return dayjs(timestamp).format('DD MMM YYYY')
})