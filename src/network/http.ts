import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface Http {
  axios(url: string, options: AxiosRequestConfig): Promise<AxiosResponse>;
}

export type HttpConstructor = {
  new (baseURL: string, getCsrfToken: Function): Http;
};

export default class HttpClient implements Http {
  constructor(
    private readonly baseURL: string,
    private readonly getCsrfToken: Function
  ) {}

  async axios(url: string, options: AxiosRequestConfig) {
    try {
      const res = await axios({
        url: `${this.baseURL}${url}`,
        headers: {
          "Content-Type": "application/json",
          "dwitter-csrf-token": this.getCsrfToken(),
        },
        withCredentials: true, // 브라우저가 자동으로  쿠키에 있는 토큰을 추가해서 보내줌 (서버와 세트)
        ...options,
      });

      return res;
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data.message);
      } else {
        throw new Error(err.message);
      }
    }
  }
}
