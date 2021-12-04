import { useEffect, useState } from "react";
import { ApiService } from "../services/ApiService";

const generateQueryString = (query: any): string => {
  if (!query) return "";
  const queryString = Object.keys(query).map((key) => `${key}=${query[key]}`);
  return queryString.join("&");
};

export const useQuery = (query: string, variables?: any) => {
  const fetchData = async (options?: any) => {
    try {
      const qs = generateQueryString(options.qs);
      const data = await ApiService.get(`${query}?${qs}`, options);
      setResult([null, data, false, fetchData]);
    } catch (error) {
      setResult([error, null, false, fetchData]);
    }
  };

  const [result, setResult] = useState<any>([null, null, true, fetchData]);
  useEffect(() => {
    fetchData(variables);
  }, []);

  return result;
};
