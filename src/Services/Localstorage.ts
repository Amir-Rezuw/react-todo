export const LocalStorageService = <T>(
  key: string,
  value: T,
  type: "set" | "get"
) => {
  if (type === "set") {
    localStorage.setItem(key, JSON.stringify(value));
  }
  if (type === "get") {
    return localStorage.getItem(key);
  }
};
