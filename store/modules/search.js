//1存  2取
const SEARCH_HISTORY = 'SEARCH_HISTORY'
const state = {
	historyData:uni.getStorageSync(SEARCH_HISTORY) || []   //此处必须是同步缓存
}
const getters = {
	historyData:state => state.historyData
}
const mutations = {
	addHistoryItem(state,val){
		if(!val) return;
		const index = state.historyData.findIndex(item => item == val)
		if(index !== -1){
			state.historyData.splice(index,1)
		}
		//追加最新的历史记录
		state.historyData.unshift(val)
		//如果超过10条 只保留前10条
		if(state.historyData.length>10){
			state.historyData.splice(10,state.historyData.length-1)
		}
		this.commit('search/setStore')
	},
	deleteAllHistory(state){
		state.historyData = []
		this.commit('search/setStore')
	},
	deleteOneHistory(state,index){
		state.historyData.splice(index,1)
		this.commit('search/setStore')
	},
	setStore(state){
		//异步设置
		uni.setStorage({
			key:SEARCH_HISTORY,
			data:state.historyData
		})
	}
}
const actions = {}

export default{
	namespaced:true,
	state,
	getters,
	mutations,
	actions
}