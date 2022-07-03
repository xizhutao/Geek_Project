import { request } from "@/utils"
/**
 * 发布文章
 * @param {*} data 
 * @returns 
 */
export const publishArticle = (data) => {
    return async () => {
        await request.post('/mp/articles', data)
    }
}
/**
 * 存入草稿
 * @param {*} data 
 * @returns 
 */
export const SaveDraft = (data) => {
    return async () => {
        await request.post('/mp/articles?draft=true', data)
    }
}