import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Button } from "../ui/Button/Button";
import { CartWidget } from "../widgets/CartWidget/CartWidget";
import { NotificationsWidget } from "../widgets/NotificationsWidget/NotificationsWidget";
import styles from "./Layout.module.css";
import { observer } from "mobx-react-lite";
import { authStore } from "../store/authStore";

export const Layout: React.FC = observer(() => {
  const isAdmin = authStore.user?.role === "admin";

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          Интернет-магазин
        </Link>

        <nav className={styles.nav}>
          <div className={styles.iconGroup}>
            <NotificationsWidget />
            <CartWidget />
          </div>

          {isAdmin && (
            <Link to="/admin" className={styles.authLink}>
              <Button>Товары</Button>
            </Link>
          )}

          {authStore.isAuth ? (
            <Link to="/profile" className={styles.authLink}>
              <Button>Профиль</Button>
            </Link>
          ) : (
            <Link to="/auth" className={styles.authLink}>
              <Button>Авторизоваться</Button>
            </Link>
          )}
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
});