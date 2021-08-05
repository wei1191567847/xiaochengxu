import {request} from '@/utils/request.js'
const BaseUrl = 'https://api.imooc-blog.lgdsunday.club/api'
/*
	请求默认的placeholder
*/
// /search/default-text

export const getSearchDeafultText = ()=>{
	return request({
		url:`${BaseUrl}/search/default-text`,
		method:'get'
	})
}
/*
	请求热门列表
*/
export const getHotList = ()=>{
	return request({
		url:`${BaseUrl}/search/hot-list`,
		method:'get'
	})
}

/*
	根据关键字请求文章结果
*/
export const getSearch = (data)=>{
	return request({
		url:`${BaseUrl}/search`,
		method:'get',
		data
	})
}