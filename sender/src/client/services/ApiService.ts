const call = (url: string, data: RequestInit): Promise<any> => {
  const basePath = "/api";
  let code = 200;

  return fetch(basePath + url, {
    ...data,
    headers: {
      "Content-Type": "application/json",
      ...data.headers,
      App: "Sender",
    },
  } as RequestInit)
    .then((response) => {
      code = response.status;
      return response.json();
    })
    .then((response) => {
      if (code === 200) {
        return response;
      }
      throw response;
    });
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
