function useLocalStorage() {
  const getItem = <T>(key: string) => {
    const item = window.localStorage.getItem(key);

    if (!item) return null;

    return JSON.parse(item) as T;
  };

  const setItem = <T>(key: string, data: T) => {
    window.localStorage.setItem(key, JSON.stringify(data));
  };

  const removeItem = (key: string) => {
    window.localStorage.removeItem(key);
  };

  const clear = () => {
    window.localStorage.clear();
  };

  return { getItem, setItem, removeItem, clear };
}

export default useLocalStorage;
