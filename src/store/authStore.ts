import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { authService } from "../shared/services/authService";
import type { User } from "../shared/services/authService";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function getAxiosMessage(err: unknown): string | null {
  if (!axios.isAxiosError(err)) return null;

  const data: unknown = err.response?.data;

  if (isRecord(data) && typeof data.message === "string") {
    return data.message;
  }

  return typeof err.message === "string" ? err.message : null;
}

function getErrorMessage(err: unknown, fallback: string): string {
  return getAxiosMessage(err) ?? (err instanceof Error ? err.message : fallback);
}

export class AuthStore {
  user: User | null = null;
  isAuth = false;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private setToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

  private clearToken() {
    localStorage.removeItem("accessToken");
  }

  async login(email: string, password: string) {
    this.isLoading = true;
    this.error = null;

    try {
      const data = await authService.login(email, password);
      this.setToken(data.token);

      const me = await authService.me();

      runInAction(() => {
        this.user = me.user;
        this.isAuth = true;
      });

      return { success: true as const };
    } catch (e) {
      const msg = getErrorMessage(e, "Ошибка входа");
      runInAction(() => {
        this.error = msg;
        this.user = null;
        this.isAuth = false;
      });
      return { success: false as const, error: msg };
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async register(email: string, password: string) {
    this.isLoading = true;
    this.error = null;

    try {
      const data = await authService.register(email, password);
      this.setToken(data.token);

      const me = await authService.me();

      runInAction(() => {
        this.user = me.user;
        this.isAuth = true;
      });

      return { success: true as const };
    } catch (e) {
      const msg = getErrorMessage(e, "Ошибка регистрации");
      runInAction(() => {
        this.error = msg;
      });
      return { success: false as const, error: msg };
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async checkAuth() {
    this.isLoading = true;
    this.error = null;

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        runInAction(() => {
          this.user = null;
          this.isAuth = false;
        });
        return;
      }

      const me = await authService.me();
      runInAction(() => {
        this.user = me.user;
        this.isAuth = true;
      });
    } catch (e) {
      this.clearToken();
      const _msg = getErrorMessage(e, "Сессия истекла");
      runInAction(() => {
        this.user = null;
        this.isAuth = false;
        this.error = _msg;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async logout() {
    this.isLoading = true;
    this.error = null;

    try {
      await authService.logout();
    } catch (e) {
      // logout может падать — но мы всё равно чистим токен
      const msg = getErrorMessage(e, "Ошибка выхода");
      runInAction(() => {
        this.error = msg;
      });
    } finally {
      this.clearToken();
      runInAction(() => {
        this.user = null;
        this.isAuth = false;
        this.isLoading = false;
      });
    }
  }
}

export const authStore = new AuthStore();