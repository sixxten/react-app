import React, { useState } from "react";
import { Input } from "../../ui/Input/Input";
import { Select } from "../../ui/Select/Select";
import { Button } from "../../ui/Button/Button";
import styles from "./AuthWidget.module.css";

const roleOptions = [
  { value: "customer", label: "Покупатель" },
  { value: "manager", label: "Менеджер" },
  { value: "admin", label: "Администратор" },
];

export const AuthWidget: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const handleLogin = () => {
    console.log("login", { email, password, role });
  };

  const handleRegister = () => {
    console.log("register", { email, password, role });
  };

  return (
    <section className={styles.card}>
      <h1 className={styles.title}>Интернет-магазин</h1>

      <div className={styles.inputsBlock}>
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
        <Select
          name="role"
          value={role}
          options={roleOptions}
          onChange={setRole}
        />
      </div>

      <div className={styles.buttonsRow}>
        <Button type="button" onClick={handleLogin}>
          Вход
        </Button>
        <Button type="button" onClick={handleRegister}>
          Зарегистрироваться
        </Button>
      </div>
    </section>
  );
};
