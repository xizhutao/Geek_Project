import axios from 'axios'
// 创建异步的action发ajax请求
export const login = (Logindata) => {
    return async (dispatch) => {
        const res = await axios.post('http://geek.itheima.net/v1_0/authorizations', Logindata)
        const { data: { token }, message } = res.data
        if (message === 'OK') {
            // 将获取的token存储到本地
            localStorage.setItem('tokenStr', token)
            // 将获取的token存储到redux
            dispatch({
                type: 'login/setToken',
                payload: token
            })
        }
    }
}
