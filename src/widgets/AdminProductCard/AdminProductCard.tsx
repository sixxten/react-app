import React from "react";
import baseStyles from "../ProductCard/ProductCard.module.css";
import styles from "./AdminProductCard.module.css";
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
    <div className={baseStyles.card}>
      <div className={baseStyles.media}>
        {imgSrc ? (
          <img className={baseStyles.img} src={imgSrc} alt={title} loading="lazy" />
        ) : (
          <div className={baseStyles.placeholder}>Нет фото</div>
        )}
      </div>

      <div className={baseStyles.body}>
        <div className={baseStyles.title} title={title}>
          {title}
        </div>
        <div className={baseStyles.price}>{price.toLocaleString("ru-RU")} ₽</div>

        <div className={styles.adminActions}>
          <Button onClick={() => onEdit(id)} className={styles.actionBtn}>
            Ред.
          </Button>
          <Button onClick={() => onDelete(id)} className={styles.actionBtn}>
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
};
