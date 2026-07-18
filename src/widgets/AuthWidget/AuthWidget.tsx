import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import styles from "./AuthWidget.module.css";
import { authStore } from "../../store/authStore";

export const AuthWidget: React.FC = observer(() => {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  
  const [errors, setErrors] = useState({ email: "", password: "", repeatPassword: "" });
  const [serverError, setServerError] = useState("");

  const handleModeSwitch = (newMode: "login" | "register") => {
    setMode(newMode);
    setErrors({ email: "", password: "", repeatPassword: "" });
    setServerError("");
    setPassword("");
    setRepeatPassword("");
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", repeatPassword: "" };

    if (!email) {
      newErrors.email = "Введите email";
      isValid = false;
    } else if (!email.includes("@")) {
      newErrors.email = "Некорректный email";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Введите пароль";
      isValid = false;
    } else if (mode === "register") {
      const hasUpperCase = /[A-ZА-ЯЁ]/.test(password);
      const hasSpecialChar = /[!\-_]/.test(password);
      
      if (!hasUpperCase || !hasSpecialChar) {
        newErrors.password = "Нужна заглавная буква и спецсимвол (!, -, _)";
        isValid = false;
      }
    }

    if (mode === "register") {
      if (!repeatPassword) {
        newErrors.repeatPassword = "Повторите пароль";
        isValid = false;
      } else if (password !== repeatPassword) {
        newErrors.repeatPassword = "Пароли не совпадают";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    const result =
      mode === "login"
        ? await authStore.login(email, password)
        : await authStore.register(email, password);

    if (result.success) {
      navigate("/", { replace: true });
    } else if (result.error) {
      const errLower = result.error.toLowerCase();
      
      if (mode === "login") {
        if (
          errLower.includes("wrong password") ||
          errLower.includes("incorrect data while logging") ||
          errLower.includes("неверн") ||
          errLower.includes("пользовател") ||
          errLower.includes("найден") ||
          errLower.includes("400") ||
          errLower.includes("401") ||
          errLower.includes("404")
        ) {
          setServerError("Неверный email или пароль");
        }
      } else if (mode === "register") {
        if (
          errLower.includes("user already exists") ||
          errLower.includes("существу") ||
          errLower.includes("400") ||
          errLower.includes("409")
        ) {
          setServerError("Такой пользователь уже существует");
        }
      }
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

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          name="email"
          type="email"
          value={email}
          placeholder="Введите email"
          error={errors.email}
          onChange={(val) => {
            setEmail(val);
            setErrors((prev) => ({ ...prev, email: "" }));
            setServerError("");
          }}
        />

        <Input
          name="password"
          type="password"
          value={password}
          placeholder="Введите пароль"
          error={errors.password}
          onChange={(val) => {
            setPassword(val);
            setErrors((prev) => ({ ...prev, password: "" }));
            setServerError("");
          }}
        />

        {mode === "register" && (
          <Input
            name="repeatPassword"
            type="password"
            value={repeatPassword}
            placeholder="Повторите пароль"
            error={errors.repeatPassword}
            onChange={(val) => {
              setRepeatPassword(val);
              setErrors((prev) => ({ ...prev, repeatPassword: "" }));
            }}
          />
        )}

        <div className={styles.buttonsRow}>
          <Button type="submit" disabled={authStore.isLoading}>
            {authStore.isLoading ? "..." : mode === "login" ? "Войти" : "Зарегистрироваться"}
          </Button>
        </div>
      </form>

      {serverError && <div className={styles.serverError}>{serverError}</div>}

      <div className={styles.switchRow}>
        {mode === "login" ? (
          <>
            <span className={styles.switchText}>Нет аккаунта?</span>
            <Button type="button" variant="link" onClick={() => handleModeSwitch("register")}>
              Зарегистрироваться
            </Button>
          </>
        ) : (
          <>
            <span className={styles.switchText}>Уже есть аккаунт?</span>
            <Button type="button" variant="link" onClick={() => handleModeSwitch("login")}>
              Войти
            </Button>
          </>
        )}
      </div>
    </section>
  );
});