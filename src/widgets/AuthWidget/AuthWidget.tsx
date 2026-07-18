import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import styles from "./AuthWidget.module.css";
import { authStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export const AuthWidget: React.FC = observer(() => {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "register" && password !== repeatPassword) {
      alert("Пароли не совпадают");
      return;
    }

    const result =
      mode === "login"
        ? await authStore.login(email, password)
        : await authStore.register(email, password);

    if (result.success) {
      navigate("/", { replace: true });
    }
  };


  return (
    <section className={styles.card}>
      <h2 className={styles.subtitle}>
        {mode === "login" ? "Авторизация" : "Регистрация"}
      </h2>

      {authStore.isAuth && authStore.user && (
        <div className={styles.success}>
          Вы вошли как: <b>{authStore.user.email}</b>
        </div>
      )}

      {authStore.error && <div className={styles.error}>{authStore.error}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          value={email}
          placeholder="Введите email"
          onChange={setEmail}
        />

        <Input
          name="password"
          type="password"
          value={password}
          placeholder="Введите пароль"
          onChange={setPassword}
        />

        {mode === "register" && (
          <Input
            name="repeatPassword"
            type="password"
            value={repeatPassword}
            placeholder="Повторите пароль"
            onChange={setRepeatPassword}
          />
        )}

        <div className={styles.buttonsRow}>
          <Button type="submit" disabled={authStore.isLoading}>
            {authStore.isLoading ? "..." : mode === "login" ? "Войти" : "Зарегистрироваться"}
          </Button>

          {authStore.isAuth && (
            <Button
              type="button"
              variant="link"
              onClick={() => authStore.logout()}
              disabled={authStore.isLoading}
            >
              Выйти
            </Button>
          )}
        </div>
      </form>

      <div className={styles.switchRow}>
        {mode === "login" ? (
          <>
            <span className={styles.switchText}>Нет аккаунта?</span>
            <Button type="button" variant="link" onClick={() => setMode("register")}>
              Зарегистрироваться
            </Button>
          </>
        ) : (
          <>
            <span className={styles.switchText}>Уже есть аккаунт?</span>
            <Button type="button" variant="link" onClick={() => setMode("login")}>
              Войти
            </Button>
          </>
        )}
      </div>
    </section>
  );
});