export interface Storage {
  saveItem(value: string): void;
  getItem(): string | null;
  removeItem(): void;
}

export type StorageConstructor = {
  new (key: string): Storage;
};

export const AUTH_STORAGE_KEY = "isAuthenticated";

export default class StorageImpl implements Storage {
  constructor(private readonly key: string) {}

  saveItem(value: string) {
    localStorage.setItem(this.key, value);
  }

  getItem() {
    return localStorage.getItem(this.key);
  }

  removeItem() {
    localStorage.removeItem(this.key);
  }
}
