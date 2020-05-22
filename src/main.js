import 'whatwg-fetch'
import Vue from 'vue'
import MouseTrap from 'mousetrap'

import App from './App.vue'
import router from './router'

import {eventBus} from './common/event-bus'
import {CLOSE_MODAL} from './common/types'

import './css/app.scss'

Vue.config.productionTip = false

MouseTrap.bind('esc', () => {
  eventBus.$emit(CLOSE_MODAL)
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
