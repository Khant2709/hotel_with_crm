async function allRequest(data, requests) {
    try {
        const responses = await Promise.all(requests.map((request) => request()));
        responses.forEach((res, index) => {
            const key = Object.keys(data)[index];
            data[key] = {...res.data, status: res.status};
        });
        return data;
    } catch (error) {
        console.debug('Произошла ошибка в запросе', error);
        return data
    }
}

export default allRequest;