import React from "react";
import styles from "./MainPage.module.css";

export const MainPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Интернет-магазин</h1>
    </div>
  );
};