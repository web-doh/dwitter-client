import axios from "axios";

export interface IRequest {
  username: string;
  password: string;
}

type user = {
  username: string;
  password: string;
  name: string;
  email: string;
  profile_url?: string;
};

export default class AuthService {
  constructor(private readonly baseURL: string) {
    axios.defaults.baseURL = this.baseURL;
  }

  async signup(userInfo: user) {
    try {
      const response = await axios.post(`/auth/signup`, userInfo);

      return response;
    } catch (err) {
      return err;
    }
  }

  async login(userInfo: IRequest) {
    try {
      const response = await axios.post(`/auth/login`, userInfo);

      return response;
    } catch (err) {
      return err;
    }
  }

  async me() {
    return {
      username: "ellie",
      token: "abc1234",
    };
  }

  async logout() {
    return;
  }
}
