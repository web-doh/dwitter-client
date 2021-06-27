const TOKEN = "token";

export interface Storage {
  save(item: string): void;
  get(): string | null;
  clear(): void;
}

export type StorageConstructor = {
  new (): Storage;
};

export default class TokenStorage implements Storage {
  public save(token: string) {
    localStorage.setItem(TOKEN, token);
  }
  public get() {
    return localStorage.getItem(TOKEN);
  }
  public clear() {
    localStorage.removeItem(TOKEN);
  }
}
