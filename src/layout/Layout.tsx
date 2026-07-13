import React from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "./Layout.module.css";

export const Layout: React.FC = () => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          Интернет-магазин
        </Link>

        <nav className={styles.nav}>
          <Link to="/login" className={styles.authButton}>
            Авторизоваться
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};