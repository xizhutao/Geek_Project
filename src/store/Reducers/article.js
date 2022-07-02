
const initState = {
    channels: [],
    // 文章的数据
    page: 1,
    pageSize: 10,
    list: [],
    count: 0

}
/**
 * 处理文章频道和文章列表的action,将数据储存到redux
 * @param {*} preState 
 * @param {*} action 
 * @returns 
 */
const getAticleChannels = (preState = initState, action) => {
    switch (action.type) {
        case 'article/getAticleChannels':
            return {
                ...preState,
                channels: action.payload
            }
        case 'article/getArticleList':
            return {
                ...preState,
                ...action.payload
            }
        default:
            return preState
    }
}
export default getAticleChannels