const createResponse = ({data = null, status = 200, error = null} = {}) => ({
  data,
  status,
  ...(error ? {error} : {}),
});

// Функция для пачки запросов
export async function batchRequest(data, requests) {
  const keys = Object.keys(data);
  const results = await Promise.allSettled(requests.map((request) => request()));

  results.forEach((result, index) => {
    const key = keys[index];
    if (result.status === "fulfilled") {
      const res = result.value;
      data[key] = createResponse({
        data: res?.data || res,
        status: res?.status || 200,
      });
    } else {
      console.warn(`Ошибка в запросе ${key}:`, result.reason);
      data[key] = createResponse({
        status: 500,
        error: result.reason.response.data.errorText ||
            result.reason.message ||
            "Неизвестная ошибка",
      });
    }
  });

  return data;
}

// Функция для одиночного запроса
export async function singleRequest(request) {
  try {
    const result = await request();
    return createResponse({
      data: result?.data || result,
      status: result?.status || 200,
      message: result?.data?.message || null
    });
  } catch (error) {
    console.warn("Ошибка в одиночном запросе:", error);
    return createResponse({
      status: error.response?.status || 500,
      error: error.response?.data?.message ||
          error.response?.data?.errorText ||
          error.message ||
          "Неизвестная ошибка",
    });
  }
}