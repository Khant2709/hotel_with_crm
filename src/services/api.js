import {axiosAdmin, axiosClient} from "./axiosService";

export const callBackRequest = async (data) => {
    try {
        return await axiosClient.post("/connection/callback", data)
    } catch (error) {
        console.debug("Ошибка при отправке заявки на обратный звонок", error)
        throw error;
    }
};


export const createArticle = async (data) => {
    try {
        return await axiosAdmin.post(`/blog/create`, data);
    } catch (error) {
        console.debug("Ошибка при создании статьи:", error);
        return error;
    }
};

export const updateArticleData = async (data) => {
    try {
        return await axiosAdmin.patch(`/blog/article`, data);
    } catch (error) {
        console.debug("Ошибка:", error);
        return error;
    }
};

export const deleteArticle = async (id) => {
    try {
        return await axiosClient.delete(`/blog/delete/${id}`);
    } catch (error) {
        console.debug("Ошибка при получении удалении статьи:", error);
        return error;
    }
};

export const createArticleImage = async (data) => {
    try {
        return await axiosAdmin.post(`/blog/create/image`, data);
    } catch (error) {
        console.debug("Ошибка при добавлении фотографии:", error);
        return error;
    }
};

export const updateArticleImage = async (data) => {
    try {
        return await axiosAdmin.patch(`/blog/update/image`, data);
    } catch (error) {
        console.debug("Ошибка при обновлении данных фотографии:", error);
        return error;
    }
};

export const deleteArticleImage = async (id) => {
    try {
        return await axiosClient.delete(`/blog/delete/image/${id}`);
    } catch (error) {
        console.debug("Ошибка при удалении фотографии статьи:", error);
        return error;
    }
};