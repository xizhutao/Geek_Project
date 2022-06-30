// 获取用户信息
import { request } from '@/utils/request'
export const getUserInfo = () => {
    return async (dispatch, getState) => {
        const { userlogin: token } = getState()
        const res = await request.get('/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch({
            type: 'geek/getUserInfo',
            payload: res.data.data
        })
    }
}
