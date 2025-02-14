import axios from "axios";
import {BASE_URL, TIMEOUT} from "../config/envData.js";

/**
 * Создаёт экземпляр Axios с указанным типом контента.
 * @param {string} contentType - Тип контента (например, 'application/json').
 * @returns {import('axios').AxiosInstance} - Экземпляр Axios.
 */
const createAxios = (contentType) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': contentType,
        },
        timeout: TIMEOUT,
        withCredentials: true,
    });
};

export const axiosJson = createAxios('application/json');
export const axiosFormData = createAxios('multipart/form-data');


// Клиентский экземпляр для запросов без токена
export const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: TIMEOUT,
    withCredentials: true, // Разрешить отправку cookies
});

export const axiosAdmin = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    timeout: TIMEOUT,
    withCredentials: true,
});