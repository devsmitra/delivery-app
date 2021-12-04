const call = (url: string, data: RequestInit): Promise<any> => {
  const basePath = "/api";

  return fetch(basePath + url, {
    ...data,
    headers: {
      "Content-Type": "application/json",
    },
  } as RequestInit).then((response) => response.json());
};

export const ApiService = {
  get: (url: string, data: RequestInit = {}): Promise<any> => {
    return call(url, {
      ...data,
      method: "GET",
    });
  },
  post: (url: string, data: RequestInit = {}): Promise<any> => {
    return call(url, {
      ...data,
      method: "POST",
      body: JSON.stringify(data.body ?? {}),
    });
  },
  put: (url: string, data: RequestInit = {}): Promise<any> => {
    return call(url, {
      ...data,
      method: "PUT",
      body: JSON.stringify(data.body ?? {}),
    });
  },
};
