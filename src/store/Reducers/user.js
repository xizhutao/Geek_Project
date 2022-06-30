/**
 * 获取用户信息
 */
const initState = {}
const getUserInfo = (preState = initState, action) => {
    switch (action.type) {
        case 'geek/getUserInfo':
            return action.payload
        default:
            return preState
    }
}
export default getUserInfo