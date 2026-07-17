import React from "react";
import styles from "./AdminPage.module.css";

export const AdminPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Админ-панель</h1>
      <p className={styles.placeholder}>
        Здесь будет интерфейс для добавления и управления товарами.
      </p>
    </div>
  );
};