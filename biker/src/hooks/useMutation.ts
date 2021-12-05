import { useState } from "react";
import { ApiService } from "../services/ApiService";
import { useCookies } from "react-cookie";

// Custom hook to use http post and put methods
export const useMutation = (query: string) => {
  const [cookies, _, removeCookie] = useCookies(["token"]);
  const fetchData = async (options?: RequestInit) => {
    setResult([null, null, true, fetchData]);
    try {
      const handler =
        options?.method === "PUT" ? ApiService.put : ApiService.post;
      const data = await handler(query, {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: cookies?.token,
        },
      });
      setResult([null, data, false, fetchData]);
    } catch (error: any) {
      if (error?.code === 401) {
        removeCookie("token");
      }
      setResult([error, null, false, fetchData]);
    }
  };
  const [result, setResult] = useState<any>([null, null, false, fetchData]);
  return result;
};
