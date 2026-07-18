import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import { Input } from "../../ui/Input/Input";
import { Button } from "../../ui/Button/Button";
import { authStore } from "../../store/authStore";

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const email = authStore.user?.email ?? "—";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");

  const handleLogout = async () => {
    await authStore.logout();
    navigate("/auth", { replace: true });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.page}>
      <div className={styles.topRow}>
        <h1 className={styles.title}>Личный кабинет</h1>

      </div>

      <section className={styles.infoBlock}>
        <h2 className={styles.sectionTitle}>Основная информация</h2>

        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Email:</span>
          <span className={styles.infoValue}>{email}</span>
        </div>
        <Button type="button" onClick={() => void handleLogout()}>
          Выйти
        </Button>
      </section>
      

      <section className={styles.formBlock}>
        <h2 className={styles.sectionTitle}>Информация о себе</h2>

        <form className={styles.form} onSubmit={handleSave}>
          <div className={styles.field}>
            <label className={styles.label}>Имя</label>
            <Input
              name="firstName"
              value={firstName}
              placeholder="Введите имя"
              onChange={setFirstName}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Фамилия</label>
            <Input
              name="lastName"
              value={lastName}
              placeholder="Введите фамилию"
              onChange={setLastName}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Город</label>
            <Input
              name="city"
              value={city}
              placeholder="Введите город"
              onChange={setCity}
            />
          </div>

          <div className={styles.actions}>
            <Button type="submit">Сохранить</Button>
          </div>
        </form>
      </section>
    </div>
  );
};
