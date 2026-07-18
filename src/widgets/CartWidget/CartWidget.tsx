import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { CartButton } from "../../ui/CartButton/CartButton";
import { cartStore } from "../../store/cartStore";
import { authStore } from "../../store/authStore";
import styles from "./CartWidget.module.css";

const API_ORIGIN = "http://localhost:5000";

export const CartWidget: React.FC = observer(() => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  const isAuth = authStore.isAuth;

  const goToLogin = () => {
    close();
    navigate("/auth");
  };

  return (
    <>
      <CartButton count={cartStore.totalCount} onClick={toggle} />
      
      {isOpen && <div className={styles.backdrop} onClick={close} />}

      <div className={[styles.sidebar, isOpen ? styles.open : ""].join(" ")}>
        <div className={styles.header}>
          <h2>Корзина</h2>
          <button className={styles.closePanelBtn} onClick={close}>✕</button>
        </div>

        <div className={styles.body}>
          {!isAuth ? (
            <div className={styles.unauthMessage}>
              <p>Вы не авторизованы</p>
              <button onClick={goToLogin} className={styles.authLinkBtn}>
                Авторизоваться
              </button>
            </div>

          ) : cartStore.items.length === 0 ? (
            <div className={styles.empty}>Корзина пока пустая.</div>
            
          ) : (
            <div className={styles.itemsList}>
              {cartStore.items.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  
                  <div className={styles.itemImageWrapper}>
                    {item.imageUrl ? (
                      <img src={API_ORIGIN + item.imageUrl} alt={item.title} />
                    ) : (
                      <div className={styles.noImage}>—</div>
                    )}
                  </div>

                  <div className={styles.itemInfo}>
                    <div className={styles.itemTitle} title={item.title}>
                      {item.title}
                    </div>
                    <div className={styles.itemPrice}>
                      {Number(item.price).toLocaleString("ru-RU")} ₽
                    </div>
                  </div>
                  
                  <button 
                    className={styles.removeBtn} 
                    onClick={() => cartStore.removeItem(item.id)}
                    title="Удалить"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {isAuth && cartStore.items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.total}>
              Итого: <span>{cartStore.totalPrice.toLocaleString("ru-RU")} ₽</span>
            </div>
            <div onClick={() => cartStore.clearCart()} className={styles.clearBtn}>
              Очистить всё
            </div>
          </div>
        )}
      </div>
    </>
  );
});