import {makeRequest} from "./makeRequest";


/** Создает новое бронирование. */
export const createReservation = async (data) => makeRequest('post', '/reservation/create', data);

/** Подтверждает бронирование. */
export const confirmReservation = async (id, data) => makeRequest('patch', `/reservation/confirmation/${id}`, data);

/** Завершает бронирование. */
export const conclusionReservation = async (id, aName) => {
  const queryParams = new URLSearchParams({aName}).toString();
  return makeRequest('delete', `/reservation/conclusion/${id}?${queryParams}`);
};

/** Отклоняет бронирование. */
export const refusalReservation = async (id, data) => makeRequest('post', `/reservation/refusal/${id}`, data);

/** Удаляет бронирование. */
export const deleteReservation = async (id, aId, aName) => {
  const queryParams = new URLSearchParams({aId, aName}).toString();
  return makeRequest('delete', `/reservation/delete/${id}?${queryParams}`);
};