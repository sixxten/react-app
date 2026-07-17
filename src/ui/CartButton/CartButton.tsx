import React from "react";
import styles from "./CartButton.module.css";
import cartIcon from "../../assets/cart.png";

type CartButtonProps = {
  count?: number;
  onClick?: () => void;
};

export const CartButton: React.FC<CartButtonProps> = ({
  count = 0,
  onClick,
}) => {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      <img
        src={cartIcon}
        alt="Корзина"
        className={styles.icon}
      />
      {count > 0 && <span className={styles.badge}>{count}</span>}
    </button>
  );
};