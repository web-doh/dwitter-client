import { Http, HttpConstructor } from "./../network/http";

type AuthServiceConstructorProps = {
  baseURL: string;
  getCsrfToken: Function;
  httpConstructor: HttpConstructor;
};

export type SignUpProps = {
  username: string;
  name: string;
  password1: string;
  password2: string;
  email: string;
  profile_url?: string;
};

export type LoginProps = {
  username: string;
  password: string;
};

export default class AuthService {
  private http: Http;
  constructor({
    baseURL,
    getCsrfToken,
    httpConstructor,
  }: AuthServiceConstructorProps) {
    this.http = new httpConstructor(baseURL, getCsrfToken);
  }

  signup = async (userInfo: SignUpProps) => {
    return this.http.axios(`/auth/signup`, {
      method: "post",
      data: userInfo,
    });
  };

  login = async (userInfo: LoginProps) => {
    return this.http.axios(`/auth/login`, {
      method: "post",
      data: userInfo,
    });
  };

  logout = async () => {
    return this.http.axios(`/auth/logout`, {
      method: "post",
    });
  };

  me = async () => {
    return this.http.axios(`/auth/me`, {
      method: "get",
    });
  };

  // APP 메모리에 포함하고 있다가 추가 네트워크 요청시 헤더에 포함해줌
  csrfToken = async () => {
    return this.http.axios(`/auth/csrf-token`, {
      method: "get",
    });
  };
}
