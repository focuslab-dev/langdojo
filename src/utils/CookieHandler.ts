const CookieHandler = {
  get(name: string): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split("=")[1]) : null;
  },

  set(name: string, value: string, days = 365): void {
    if (typeof document === "undefined") return;
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  },

  has(name: string): boolean {
    return CookieHandler.get(name) !== null;
  },

  remove(name: string): void {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
  },
};

export default CookieHandler;
