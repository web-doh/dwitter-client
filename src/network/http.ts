import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axiosRetry from "axios-retry";

export interface Http {
  axios(url: string, options: AxiosRequestConfig): Promise<AxiosResponse>;
}

export type HttpConstructor = {
  new (baseURL: string, getCsrfToken: Function): Http;
};

type retryConfig = {
  retries: number;
  initialDelayMs: number;
};

const defaultRetryConfig: retryConfig = {
  retries: 3,
  initialDelayMs: 100,
};

export default class HttpClient implements Http {
  private readonly client: AxiosInstance;
  constructor(
    baseURL: string,
    private readonly getCsrfToken: Function,
    config: retryConfig = defaultRetryConfig
  ) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // 브라우저가 자동으로 쿠키에 있는 토큰을 추가해서 보내줌 (fetch의 credentials: 'include' 기능 - 서버와 세트)
    });

    axiosRetry(this.client, {
      retries: config.retries,
      retryDelay: (retry) => {
        const delay = Math.pow(2, retry) * config.initialDelayMs; // 점점 긴 간격으로 딜레이 되도록
        const jitter = delay * 0.1 * Math.random(); // 일정하지 않은 시간 간격으로 랜덤하게 재시도 되도록
        return delay + jitter;
      },
      retryCondition: (err) =>
        axiosRetry.isNetworkOrIdempotentRequestError(err) || // 네트워크 에러 또는 많이 요청해도 서버의 상태를 변경하지 않는 get 등의 멱등성이 유지되는 요청의 에러일때
        err.response?.status === 429, // 또는 한 번에 네트워크가 몰린 경우에만 재시도
    });
  }

  async axios(url: string, options: AxiosRequestConfig) {
    const { method, headers, data } = options;
    try {
      const res = await this.client({
        url,
        method,
        headers: {
          ...headers,
          "dwitter-csrf-token": this.getCsrfToken(),
        },
        data,
      });

      return res;
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data || "Something wrong!");
      }
      throw new Error("Connection Error!");
    }
  }
}
