import React from "react";
import { AuthWidget } from "../../widgets/AuthWidget/AuthWidget";
import styles from "./HomePage.module.css";

export const HomePage: React.FC = () => {
  return (
    <main className={styles.page}>
      <AuthWidget />
    </main>
  );
};