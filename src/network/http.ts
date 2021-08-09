import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface Http {
  axios(url: string, options: AxiosRequestConfig): Promise<AxiosResponse>;
}

export type HttpConstructor = {
  new (baseURL: string): Http;
};

export default class HttpClient implements Http {
  constructor(private readonly baseURL: string) {}

  async axios(url: string, options: AxiosRequestConfig) {
    try {
      const res = await axios({
        url: `${this.baseURL}${url}`,
        ...options,
      });

      return res;
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data);
      } else {
        throw new Error(err.message);
      }
    }
  }
}
