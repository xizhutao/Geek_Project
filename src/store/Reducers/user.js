const initState = localStorage.getItem('tokenStr') || ''
const userlogin = (preState = initState, action) => {
    switch (action.type) {
        case 'login/setToken':
            return action.payload
        default:
            return preState
    }
}
export default userlogin