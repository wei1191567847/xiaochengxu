import {request} from '@/utils/request.js'
const BaseUrl = 'https://api.imooc-blog.lgdsunday.club/api'
/*
	请求tabBar
*/
export const getTarbars = ()=>{
	return request({
		url:`${BaseUrl}/hot/tabs`,
		method:'get'
	})
}
/*
	根据tab id 请求文章列表
*/
export const getListByTabId = (id)=>{
	return request({
		url:`${BaseUrl}/hot/list`,
		method:'get',
		data:{type:id}
	})
}