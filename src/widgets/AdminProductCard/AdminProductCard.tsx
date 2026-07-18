import React from "react";
import styles from "../ProductCard/ProductCard.module.css";
import { Button } from "../../ui/Button/Button";

type Props = {
  id: number;
  title: string;
  price: number;
  imageUrl?: string | null;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const API_ORIGIN = "http://localhost:5000";

export const AdminProductCard: React.FC<Props> = ({ 
  id, 
  title, 
  price, 
  imageUrl, 
  onEdit, 
  onDelete 
}) => {
  const imgSrc = imageUrl ? API_ORIGIN + imageUrl : null;

  return (
    <div className={styles.card}>
      <div className={styles.media}>
        {imgSrc ? (
          <img className={styles.img} src={imgSrc} alt={title} loading="lazy" />
        ) : (
          <div className={styles.placeholder}>Нет фото</div>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.title} title={title}>
          {title}
        </div>
        <div className={styles.price}>{price.toLocaleString("ru-RU")} ₽</div>
        
        <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
          <div style={{ flex: 1 }}>
            <Button onClick={() => onEdit(id)}>Ред.</Button>
          </div>
          <div style={{ flex: 1 }}>
            <Button onClick={() => onDelete(id)}>Удалить</Button>
          </div>
        </div>
      </div>
    </div>
  );
};