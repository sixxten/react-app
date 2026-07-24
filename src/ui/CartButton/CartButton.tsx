import React from "react";
import styles from "./CartButton.module.css";
import { ShoppingCart } from "lucide-react"; 

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
      <ShoppingCart size={28} color="#333" className={styles.icon} />
      
      {count > 0 && <span className={styles.badge}>{count}</span>}
    </button>
  );
};
