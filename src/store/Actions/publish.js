import { request } from "@/utils"

export const publishArticle = (data) => {
    return async () => {
        await request.post('/mp/articles', data)
    }
}