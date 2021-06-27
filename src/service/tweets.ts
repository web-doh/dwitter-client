import { StorageConstructor, Storage } from "../db/token";
import { Network, NetworkConstructor } from "../util/httpNetwork";

export interface IRequest {
  body: string;
  id?: string;
}

type TweetServiceConstructorProps = {
  baseURL: string;
  httpConstructor: NetworkConstructor;
  tokenStorageConstructor: StorageConstructor;
};

export default class TweetService {
  private http: Network;
  private tokenStorage: Storage;

  private headers: { Authorization: string };
  constructor({
    baseURL,
    httpConstructor,
    tokenStorageConstructor,
  }: TweetServiceConstructorProps) {
    this.http = new httpConstructor(baseURL);
    this.tokenStorage = new tokenStorageConstructor();
    this.headers = this.getHeaders();
  }

  private getHeaders = () => {
    const token = this.tokenStorage.get();
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  get = async (username: string = "") => {
    return this.http.axios(`/tweets/${username}`, {
      method: "get",
      headers: this.headers,
    });
  };

  post = async (tweetInfo: IRequest) => {
    return this.http.axios(`/tweets`, {
      method: "post",
      headers: this.headers,
      data: tweetInfo,
    });
  };

  update = async (tweetInfo: IRequest) => {
    const { id, body } = tweetInfo;
    return this.http.axios(`/tweets/${id}`, {
      method: "put",
      headers: this.headers,
      data: {
        body,
      },
    });
  };

  delete = async (tweetId: string) => {
    return this.http.axios(`/tweets/${tweetId}`, {
      method: "delete",
      headers: this.headers,
    });
  };
}
