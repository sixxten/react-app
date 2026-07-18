import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ProductDetailsPage.module.css";
import { productService, type Product } from "../../shared/services/productService";
import { cartStore } from "../../store/cartStore";
import { Button } from "../../ui/Button/Button";
import { observer } from "mobx-react-lite";

const API_ORIGIN = "http://localhost:5000";

export const ProductDetailsPage: React.FC = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  
  // Состояние для показа модального окна
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (id) {
      productService.getById(Number(id)).then(setProduct);
    }
  }, [id]);

  if (!product) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  const imgSrc = product.imageUrl ? API_ORIGIN + product.imageUrl : null;
  const inCart = cartStore.items.some((item) => item.id === product.id);
  
  const isAuth = !!localStorage.getItem("accessToken");

  const handleAddToCart = () => {
    if (!isAuth) {
      setShowAuthModal(true);
      return;
    }
    cartStore.addItem(product);
  };

  const formattedPrice = Number(product.price).toLocaleString("ru-RU");

  return (
    <div className={styles.container}>
      <div className={styles.imageSector}>
        {imgSrc ? (
          <img className={styles.image} src={imgSrc} alt={product.title} />
        ) : (
          <div className={styles.placeholder}>Нет фото</div>
        )}
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.infoSector}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.desc}>{product.description || "Описание отсутствует"}</p>
        </div>
        
        <div className={styles.actionSector}>
          <div className={styles.price}>{formattedPrice} ₽</div>
          <Button 
            onClick={handleAddToCart} 
            disabled={inCart && isAuth}
          >
            {inCart && isAuth ? "Уже в корзине" : "Добавить в корзину"}
          </Button>
        </div>
      </div>

      {showAuthModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAuthModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeModalBtn} 
              onClick={() => setShowAuthModal(false)}
            >
              ✕
            </button>
            <p>Вы не авторизованы</p>
            <button 
              className={styles.authLinkBtn} 
              onClick={() => navigate("/auth")}
            >
              Авторизоваться
            </button>
          </div>
        </div>
      )}
    </div>
  );
});