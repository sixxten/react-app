import React, { useEffect, useState } from "react";
import styles from "./AdminPage.module.css";
import { observer } from "mobx-react-lite";
import { authStore } from "../../store/authStore";
import { Button } from "../../ui/Button/Button";
import { categoryService, type Category } from "../../shared/services/categoryService";
import { productService, type Product } from "../../shared/services/productService";
import { AdminProductCard } from "../../widgets/AdminProductCard/AdminProductCard";
import { AdminCreateModal } from "../../widgets/AdminCreateModal/AdminCreateModal"; // Импортируем нашу вынесенную модалку

export const AdminPage: React.FC = observer(() => {
  const isAdmin = authStore.user?.role === "admin";

  const [isCreating, setIsCreating] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      const [cats, prods] = await Promise.all([
        categoryService.getAll(),
        productService.getAll(),
      ]);
      setCategories(cats);
      setProducts(prods);
    })();
  }, [isAdmin]);

  const handleProductCreated = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    setIsCreating(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Точно удалить?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (id: number) => {
    alert("Редактирование для ID: " + id);
  };

  if (!authStore.isAuth) {
    return (
      <div className={styles.page}>
        <p className={styles.placeholder}>Нужно авторизоваться.</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className={styles.page}>
        <p className={styles.placeholder}>Доступ только для администратора.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      
      {isCreating && (
        <AdminCreateModal 
          categories={categories} 
          onSuccess={handleProductCreated} 
          onClose={() => setIsCreating(false)} 
        />
      )}

      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        position: "relative",
        marginBottom: "30px" 
      }}>
        <h1 style={{ margin: 0 }}>Товары</h1>
        
        <div style={{ position: "absolute", right: 0 }}>
          <Button onClick={() => setIsCreating(true)}>+ Добавить товар</Button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
        {products.map((p) => (
          <AdminProductCard
            key={p.id}
            id={p.id}
            title={p.title}
            price={p.price}
            imageUrl={p.imageUrl}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      
    </div>
  );
});