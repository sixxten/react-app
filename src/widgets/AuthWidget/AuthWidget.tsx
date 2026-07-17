import React, { useState } from "react";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import styles from "./AuthWidget.module.css";

export const AuthWidget: React.FC = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className={styles.card}>
      <h2 className={styles.subtitle}>
        {mode === "login" ? "Авторизация" : "Регистрация"}
      </h2>

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
          <Button type="submit">
            {mode === "login" ? "Войти" : "Зарегистрироваться"}
          </Button>
        </div>
      </form>

      <div className={styles.switchRow}>
        {mode === "login" ? (
          <>
            <span className={styles.switchText}>Нет аккаунта?</span>
            <Button
              type="button"
              variant="link"
              onClick={() => setMode("register")}
            >
              Зарегистрироваться
            </Button>
          </>
        ) : (
          <>
            <span className={styles.switchText}>Уже есть аккаунт?</span>
            <Button
              type="button"
              variant="link"
              onClick={() => setMode("login")}
            >
              Войти
            </Button>
          </>
        )}
      </div>
    </section>
  );
};