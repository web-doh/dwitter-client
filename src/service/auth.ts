import { Network, NetworkConstructor } from "./../util/httpNetwork";
import { Storage, StorageConstructor } from "../db/token";

export interface IRequest {
  username: string;
  password: string;
  name?: string;
  email?: string;
  profile_url?: string;
}

type AuthServiceConstructorProps = {
  baseURL: string;
  httpConstructor: NetworkConstructor;
  tokenStorageConstructor: StorageConstructor;
};

export default class AuthService {
  private http: Network;
  private tokenStorage: Storage;
  constructor({
    baseURL,
    httpConstructor,
    tokenStorageConstructor,
  }: AuthServiceConstructorProps) {
    this.http = new httpConstructor(baseURL);
    this.tokenStorage = new tokenStorageConstructor();
  }

  signup = async (userInfo: IRequest) => {
    const response = await this.http.axios(`/auth/signup`, {
      method: "post",
      data: userInfo,
    });

    this.tokenStorage.save(response.data.token);

    return response;
  };

  login = async (userInfo: IRequest) => {
    const response = await this.http.axios(`/auth/login`, {
      method: "post",
      data: userInfo,
    });

    this.tokenStorage.save(response.data.token);

    return response;
  };

  me = async () => {
    const token = this.tokenStorage.get();

    return this.http.axios(`/auth/me`, {
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  logout = async () => {
    this.tokenStorage.clear();
  };
}
