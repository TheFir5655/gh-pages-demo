import getEndpoints from './server/db';

const endpoints = getEndpoints();

type ENDPOINTS = keyof typeof endpoints;
type RESPONSE_DATA = { greeting: string };

const getJson = async <T>(endpoint: ENDPOINTS): Promise<T> => {
  const path =
    process.env.NODE_ENV === 'development'
      ? `http://127.0.0.1:3001/api/${endpoint}`
      : `https://raw.githubusercontent.com/ВАШ_ЛОГИН/gh-pages-demo/gh-pages/static/db/${endpoint}.json`;

  console.log("Запрос по адресу:", path);

  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};

type API = {
  get: {
    data: () => Promise<RESPONSE_DATA>;
  };
};

const api: API = {
  get: {
    data: () => getJson<RESPONSE_DATA>('data'),
  },
};

export type { RESPONSE_DATA, ENDPOINTS };
export default api;

