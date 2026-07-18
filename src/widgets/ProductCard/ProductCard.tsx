import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

type Props = {
  id: string | number;
  title: string;
  price: number;
  imageUrl?: string | null;
};

const API_ORIGIN = "http://localhost:5000";

export const ProductCard: React.FC<Props> = ({ id, title, price, imageUrl }) => {
  const imgSrc =
    imageUrl && !imageUrl.startsWith("http")
      ? `${API_ORIGIN}${imageUrl}`
      : imageUrl ?? null;

  return (
    <Link to={`/products/${id}`} className={styles.card}>
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
      </div>
    </Link>
  );
};
