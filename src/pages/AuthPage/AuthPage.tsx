import React from "react";
import { AuthWidget } from "../../widgets/AuthWidget/AuthWidget";
import styles from "./AuthPage.module.css";

export const AuthPage: React.FC = () => {
  return (
    <main className={styles.page}>
      <AuthWidget />
    </main>
  );
};