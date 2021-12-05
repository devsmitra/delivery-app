import { useState } from "react";
import { ApiService } from "../services/ApiService";
import { useCookies } from "react-cookie";

type QS = { [k: string]: string | number | boolean };
type Options = RequestInit & { qs?: QS };

const generateQueryString = (query?: QS): string => {
  if (!query) return "";
  const queryString = Object.keys(query).map((key) => `${key}=${query[key]}`);
  return queryString.join("&");
};

// custom hook to query(get) the API
export const useQuery = (query: string, options?: Options) => {
  const [cookies, _, removeCookie] = useCookies(["token"]);
  const fetchData = async (options?: Options) => {
    try {
      const qs = generateQueryString(options?.qs);
      const data = await ApiService.get(`${query}?${qs}`, {
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

  const [result, setResult] = useState<any>([null, null, true, fetchData]);

  // Can be used for initial data fetching
  // useEffect(() => {
  //   fetchData(variables);
  // }, []);

  return result;
};
