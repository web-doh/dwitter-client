import axios from "axios";

export interface IRequest {
  username?: string;
  name?: string;
  body?: string;
  profile_url?: string;
  id?: number;
}

export default class TweetService {
  constructor(private readonly baseURL: string) {
    axios.defaults.baseURL = this.baseURL;
  }

  async get(username: string = "") {
    try {
      const response = await axios.get(`/tweets/${username}`);
      return response;
    } catch (err) {
      return err;
    }
  }

  async post(tweetInfo: IRequest) {
    try {
      const response = await axios.post("/tweets", tweetInfo);
      return response;
    } catch (err) {
      return err;
    }
  }

  async update(tweetInfo: IRequest) {
    const { id, body } = tweetInfo;
    try {
      const response = await axios.put(`/tweets/${id}`, { body });
      return response;
    } catch (err) {
      return err;
    }
  }

  async delete(tweetId: number) {
    try {
      const response = await axios.delete(`/tweets/${tweetId}`);
      return response;
    } catch (err) {
      return err;
    }
  }
}
