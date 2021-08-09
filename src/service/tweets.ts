import { StorageConstructor, Storage } from "../db/token";
import { Http, HttpConstructor } from "../network/http";

export type PostProps = {
  body: string;
};

export type UpdateProps = {
  id: string;
} & PostProps;

type TweetServiceConstructorProps = {
  baseURL: string;
  httpConstructor: HttpConstructor;
  tokenStorageConstructor: StorageConstructor;
};

export default class TweetService {
  private http: Http;
  private tokenStorage: Storage;

  constructor({
    baseURL,
    httpConstructor,
    tokenStorageConstructor,
  }: TweetServiceConstructorProps) {
    this.http = new httpConstructor(baseURL);
    this.tokenStorage = new tokenStorageConstructor();
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
      headers: this.getHeaders(),
    });
  };

  post = async (tweetInfo: PostProps) => {
    return this.http.axios(`/tweets`, {
      method: "post",
      headers: this.getHeaders(),
      data: tweetInfo,
    });
  };

  update = async (tweetInfo: UpdateProps) => {
    const { id, body } = tweetInfo;
    return this.http.axios(`/tweets/${id}`, {
      method: "put",
      headers: this.getHeaders(),
      data: {
        body,
      },
    });
  };

  delete = async (tweetId: string) => {
    return this.http.axios(`/tweets/${tweetId}`, {
      method: "delete",
      headers: this.getHeaders(),
    });
  };
}
