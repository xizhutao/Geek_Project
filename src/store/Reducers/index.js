import { combineReducers } from "redux"
import userlogin from '@/store/Reducers/login'
import userInfo from '@/store/Reducers/user'
export default combineReducers({
    userlogin,
    userInfo
})