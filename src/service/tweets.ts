import { Http, HttpConstructor } from "../network/http";

export type PostProps = {
  body: string;
};

export type UpdateProps = {
  id: number;
} & PostProps;

type TweetServiceConstructorProps = {
  baseURL: string;
  getCsrfToken: Function;
  httpConstructor: HttpConstructor;
};

export default class TweetService {
  private http: Http;

  constructor({
    baseURL,
    getCsrfToken,
    httpConstructor,
  }: TweetServiceConstructorProps) {
    this.http = new httpConstructor(baseURL, getCsrfToken);
  }

  get = async (username: string = "") => {
    return this.http.axios(`/tweets/${username}`, {
      method: "get",
    });
  };

  post = async (tweetInfo: PostProps) => {
    return this.http.axios(`/tweets`, {
      method: "post",
      data: tweetInfo,
    });
  };

  update = async (tweetInfo: UpdateProps) => {
    const { id, body } = tweetInfo;
    return this.http.axios(`/tweets/${id}`, {
      method: "put",
      data: { body },
    });
  };

  delete = async (tweetId: number) => {
    return this.http.axios(`/tweets/${tweetId}`, {
      method: "delete",
    });
  };
}
