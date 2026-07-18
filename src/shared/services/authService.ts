import { $host, $authHost } from "../http";

export type User = { id: number; email: string; role: string };
type AuthResponse = { message: string; token: string; user: User };

export const authService = {
  async register(email: string, password: string) {
    const { data } = await $host.post<AuthResponse>("/auth/register", { email, password });
    return data;
  },

  async login(email: string, password: string) {
    const { data } = await $host.post<AuthResponse>("/auth/login", { email, password });
    return data;
  },

  async me() {
    const { data } = await $authHost.get<{ user: User }>("/auth/me");
    return data;
  },

  async logout() {
    const { data } = await $authHost.post<{ message: string }>("/auth/logout");
    return data;
  },
};