import Storage from "./Storage";

class LocalStorage extends Storage {
  getItem<T>(key: string): T | null {
    const data = window.localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  }
  setItem<T>(key: string, data: T): T | null {
    window.localStorage.setItem(key, JSON.stringify(data));
    return data;
  }
  removeItem(key: string) {
    window.localStorage.removeItem(key);
    if (!window.localStorage.getItem(key)) {
      return true;
    } else {
      return false;
    }
  }
}

export default LocalStorage;
