import React from "react";
import styles from "./ProductDetailsPage.module.css";

export const ProductDetailsPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Информация о товаре</h1>
      <p className={styles.placeholder}>
        Здесь будет детальная информация о выбранном товаре.
      </p>
    </div>
  );
};