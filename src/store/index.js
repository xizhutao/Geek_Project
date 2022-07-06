/**
 * 此模块用于创建store
 */
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import allReducers from '@/store/Reducers'
// import { composeWithDevTools } from 'redux-devtools-extension'
// 导入合并的reducers
// 通过判断是什么环境，来决定是否使用redux开发者工具的扩展
let middlewares
if (process.env.NODE_ENV === 'production') {
    middlewares = applyMiddleware(thunk)
} else {
    const { composeWithDevTools } = require('redux-devtools-extension')
    middlewares = composeWithDevTools(applyMiddleware(thunk))
}
// const reduxDevTools = composeWithDevTools(applyMiddleware(thunk))
export default createStore(allReducers, middlewares)