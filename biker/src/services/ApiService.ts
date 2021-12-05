import { API_URL } from "../constants/APP";

const call = (url: string, data: RequestInit): Promise<any> => {
  let code = 200;
  return fetch(API_URL + url, {
    ...data,
    headers: {
      "Content-Type": "application/json",
      ...data.headers,
      App: "Biker",
    },
  } as RequestInit)
    .then((response) => {
      code = response.status;
      return response.json();
    })
    .then((response) => {
      // More checks can be added here
      if (code === 200 || code === 201) {
        return response;
      }
      // eslint-disable-next-line no-throw-literal
      throw {
        ...response,
        code,
      };
    });
};

interface Response {
  message: string;
  data?: any;
}

export const ApiService = {
  get: (url: string, data: RequestInit = {}): Promise<Response> =>
    call(url, {
      ...data,
      method: "GET",
    }),
  post: (url: string, data: RequestInit): Promise<Response> =>
    call(url, {
      ...data,
      method: "POST",
      body: JSON.stringify(data?.body ?? {}),
    }),
  put: (url: string, data: RequestInit): Promise<Response> =>
    call(url, {
      ...data,
      method: "PUT",
      body: JSON.stringify(data?.body ?? {}),
    }),
};
