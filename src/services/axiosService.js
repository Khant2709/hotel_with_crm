import axios from "axios";
import {BASE_URL, TIMEOUT} from "../config/envData.js";
import {setupCache} from 'axios-cache-interceptor';


/** Создаёт экземпляр Axios с указанным типом контента. */
const createAxios = (contentType) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": contentType,
    },
    timeout: TIMEOUT,
    withCredentials: true,
  });

  return setupCache(instance, {
    ttl: 0, // Время жизни кэша можно задавать при создании экземпляра
    debug: false, // Включаем отладку только в разработке
  });
};

export const axiosJson = createAxios('application/json');
export const axiosFormData = createAxios('multipart/form-data');