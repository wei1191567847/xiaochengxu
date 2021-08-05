export const request = ({url,method,data})=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url, //仅为实例，并非真实接口地址
			data,
			method,
			success:(res)=>{
				if(res.statusCode==200){
					resolve(res)
				}else{
					//数据返回了，但是不符合预期
					uni.showToast({
						title:res.data.message,
						icon:'error',
						mask:true,
						duration:2000
					})
					reject({
						message:res.data.message
					})
				}
				
			},
			fail:(err)=>{
				reject(err)
			},
			complete:()=>{
				uni.hideLoading()
			}
		})
	})
}