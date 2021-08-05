import {request} from '@/utils/request.js'
const BaseUrl = 'https://api.imooc-blog.lgdsunday.club/api'
/*
	文章详情
*/
export const getDetail = (data)=>{
	return request({
		url:`${BaseUrl}/article/details`,
		method:'get',
		data:{
			author:data.author,
			articleId:data.id
		}
	})
}