import React, { useState } from "react";
import styles from "./ProfilePage.module.css";
import { Input } from "../../ui/Input/Input";
import { Button } from "../../ui/Button/Button";

export const ProfilePage: React.FC = () => {
  const email = "user@example.com";
  const registrationDate = "01.01.2024";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Личный кабинет</h1>

      <section className={styles.infoBlock}>
        <h2 className={styles.sectionTitle}>Основная информация</h2>

        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Email:</span>
          <span className={styles.infoValue}>{email}</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Дата регистрации:</span>
          <span className={styles.infoValue}>{registrationDate}</span>
        </div>
      </section>

      <section className={styles.formBlock}>
        <h2 className={styles.sectionTitle}>Информация о себе</h2>

        <form className={styles.form}>
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
