
import Vue from 'vue'

//引入vuex
import vuex from 'vuex'

Vue.use(vuex)

import search from './modules/search.js'
export default new vuex.Store({
	modules:{
		search
	}
})