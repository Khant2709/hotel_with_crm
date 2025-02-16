import {articles} from "../../services/api";

export const getDataToPage = async () => {
    try {
        const resultRequest = await articles.getAllArticles()

        if (resultRequest.status === 200 && resultRequest?.data?.data?.length !== 0) {
            return {response: resultRequest.data.data}
        } else {
            throw new Error('Произошла ошибка в получении данных.')
        }
    } catch (err) {
        return {error: err};
    }
}