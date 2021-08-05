import Vue from 'vue'
import App from './App'
import './styles/global.scss'
//引入vuex
import store from '@/store/index.js'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
