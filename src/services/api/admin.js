import {makeRequest} from "./makeRequest";


export const getAdmins = async () => makeRequest('get', '/admin');

export const createAdmin = async (data) => makeRequest('post', '/admin', data);

export const updateAdmin = async (data) => makeRequest('patch', '/admin', data);

export const deleteAdmin = async (id) => makeRequest('delete', `/admin/${id}`);