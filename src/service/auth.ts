import {
  AUTH_STORAGE_KEY,
  Storage,
  StorageConstructor,
} from "./../util/storage";
import { Http, HttpConstructor } from "./../network/http";

type AuthServiceConstructorProps = {
  baseURL: string;
  getCsrfToken: Function;
  authStorageConstructor: StorageConstructor;
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
  private authStorage: Storage;
  constructor({
    baseURL,
    getCsrfToken,
    authStorageConstructor,
    httpConstructor,
  }: AuthServiceConstructorProps) {
    this.authStorage = new authStorageConstructor(AUTH_STORAGE_KEY);
    console.log(getCsrfToken);
    this.http = new httpConstructor(baseURL, getCsrfToken);
  }

  signup = async (userInfo: SignUpProps) => {
    const data = await this.http.axios(`/auth/signup`, {
      method: "post",
      data: userInfo,
    });
    this.authStorage.saveItem("true");

    return data;
  };

  login = async (userInfo: LoginProps) => {
    const data = await this.http.axios(`/auth/login`, {
      method: "post",
      data: userInfo,
    });
    this.authStorage.saveItem("true");

    return data;
  };

  logout = async () => {
    const data = await this.http.axios(`/auth/logout`, {
      method: "post",
    });
    this.authStorage.removeItem();

    return data;
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
