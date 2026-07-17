import React, { useState, useRef, useEffect } from "react";
import { CartButton } from "../../ui/CartButton/CartButton";
import styles from "./CartWidget.module.css";

export const CartWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  return (
    <div className={styles.root} ref={rootRef}>
      <CartButton count={0} onClick={toggle} />
      {isOpen && (
        <div className={styles.popup}>
          <div className={styles.empty}>Корзина пока пустая.</div>
        </div>
      )}
    </div>
  );
};