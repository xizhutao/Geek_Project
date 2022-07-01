import { request, setToken , clearToken } from '@/utils'
// 分发异步的action发ajax请求
export const login = (Logindata) => {
    return async (dispatch) => {
        const res = await request.post('/authorizations', Logindata)
        const { data: { token }, message } = res.data
        if (message === 'OK') {
            // 将获取的token存储到本地
            // localStorage.setItem('tokenStr', token)
            setToken(token)
            // 将获取的token存储到redux
            dispatch({
                type: 'login/setToken',
                payload: token
            })
        }
    }
}
export const logout = () => {
    return (dispatch) => {
        // 清除redux中的token
        dispatch({
            type: 'user/logout'
        })
        // 清除本地的token
        clearToken()
        // 清除用户信息
        dispatch({
            type: 'user/clearInfo'
        })

    }
}
