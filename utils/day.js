import dayjs from 'dayjs'
//导入语言包
import 'dayjs/locale/zh-cn'
//相对时间的组件
import rTime from 'dayjs/plugin/relativeTime.js'
//配置语言
dayjs.locale('zh-cn')
//使用组件
dayjs.extend(rTime)

export const dayTime = (time)=>{
	return dayjs().to(dayjs(time))
}