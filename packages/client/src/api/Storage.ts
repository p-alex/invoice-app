abstract class Storage {
  abstract getItem<T>(key: string): T | null;
  abstract setItem<T>(key: string, data: T): T | null;
  abstract removeItem(key: string): boolean;
}

export default Storage;
