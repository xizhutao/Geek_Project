import { combineReducers } from "redux"
import userlogin from '@/store/Reducers/login'
import userInfo from '@/store/Reducers/user'
import article from '@/store/Reducers/article'
export default combineReducers({
    userlogin,
    userInfo,
    article
})