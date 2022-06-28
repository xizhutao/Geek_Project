/**
 * 此模块用于创建store
 */
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
// 导入合并的reducers
import allReducers from '@/store/Reducers'
const reduxDevTools = composeWithDevTools(applyMiddleware(thunk))
// 全局的状态初始化
// const initState = {
//     user: localStorage.getItem('tokenStr')
// }
export default createStore(allReducers, reduxDevTools)