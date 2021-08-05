export const addThousands = (val) =>{
	const num = parseInt(val)
	if(num < 1000) return num;
	//处理千分位 3.1k
	val = ''+val
	return val.substring(0,val.length-3)+'.'+val.substring(4,5)+'k'
}