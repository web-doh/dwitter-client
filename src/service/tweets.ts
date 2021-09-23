import { Http, HttpConstructor } from "../network/http";
import Socket from "../network/socket";

export type PostProps = {
  body: string;
};

export type UpdateProps = {
  id: number;
} & PostProps;

type TweetServiceConstructorProps = {
  baseURL: string;
  socket: Socket;
  getCsrfToken: Function;
  httpConstructor: HttpConstructor;
};

export default class TweetService {
  private http: Http;
  private socket: Socket;

  constructor({
    baseURL,
    socket,
    getCsrfToken,
    httpConstructor,
  }: TweetServiceConstructorProps) {
    this.http = new httpConstructor(baseURL, getCsrfToken);
    this.socket = socket;
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

  /**
   * @param callback : 새로운 트윗이 생겼을 때 하고 싶은 함수
   * @returns
   */
  onSyncNew = (callback: Function) =>
    this.socket.onSync("tweets-post", callback);
}
