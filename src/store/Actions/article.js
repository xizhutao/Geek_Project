import { request } from '@/utils/request'
/**
 * 获取文章频道列表
 */
export const getAticleChannels = () => {
    return async (dispatch) => {
        const res = await request.get('/channels')
        const { channels } = res.data.data
        dispatch({ type: 'article/getAticleChannels', payload: channels })
    }
}
/**
 * 获取文章列表
 * @param {*} params 
 * @returns 
 */
export const getArticleList = (params) => {
    return async (dispatch) => {
        const res = await request.get('/mp/articles', {
            params
        })
        const { page, per_page: pageSize, results: list, total_count: count } = res.data.data
        dispatch({
            type: 'article/getArticleList',
            payload: {
                page,
                pageSize,
                list,
                count
            }
        })
    }
}
export const deleteArticle = (id) => {
    return async () => {
        await request.delete(`/mp/articles/${id}`)
    }
}