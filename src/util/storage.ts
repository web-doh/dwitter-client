export default class Storage {
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
