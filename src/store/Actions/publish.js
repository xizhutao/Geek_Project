import { request } from "@/utils"



// 封装发布文章和存入草稿的接口
export const saveArticle = (isDraft, data, isEdit) => {
    return async () => {
        if (isEdit) {
            await request.put(`/mp/articles/${data.id}?draft=${isDraft}`, data)
        } else {
            await request.post(`/mp/articles?draft=${isDraft}`, data)
        }
    }
}

// /**
//  * 发布文章
//  * @param {*} data 
//  * @returns 
//  */
// export const publishArticle = (data) => {
//     return async () => {
//         await request.post('/mp/articles', data)
//     }
// }
// /**
//  * 存入草稿
//  * @param {*} data 
//  * @returns 
//  */
// export const SaveDraft = (data) => {
//     return async () => {
//         await request.post('/mp/articles?draft=true', data)
//     }
// }
export const getArticleById = (id) => {
    return async () => {
        const res = await request.get(`/mp/articles/${id}`)
        return res.data.data
    }
}