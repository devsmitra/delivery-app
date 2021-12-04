import { useState } from "react";
import { ApiService } from "../services/ApiService";

export const useMutation = (query: string) => {
  const fetchData = async (options?: any) => {
    setResult([null, null, true, fetchData]);
    try {
      const data = await ApiService.post(query, options);
      setResult([null, data, false, fetchData]);
    } catch (error) {
      setResult([error, null, false, fetchData]);
    }
  };
  const [result, setResult] = useState<any>([null, null, false, fetchData]);
  return result;
};
