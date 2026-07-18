import React, { useEffect, useState } from "react";
import styles from "./AdminPage.module.css";
import { observer } from "mobx-react-lite";
import { authStore } from "../../store/authStore";
import { Button } from "../../ui/Button/Button";
import { categoryService, type Category } from "../../shared/services/categoryService";
import { productService, type Product } from "../../shared/services/productService";
import { AdminProductCard } from "../../widgets/AdminProductCard/AdminProductCard";
import { AdminCreateModal } from "../../widgets/AdminCreateModal/AdminCreateModal";
import { AdminEditModal } from "../../widgets/AdminEditModal/AdminEditModal";
import { ConfirmModal } from "../../widgets/ConfirmModal/ConfirmModal"; 

export const AdminPage: React.FC = observer(() => {
  const isAdmin = authStore.user?.role === "admin";

  const [isCreating, setIsCreating] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [deletingProductId, setDeletingProductId] = useState<number | null>(null);
  
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

  const handleDeleteClick = (id: number) => {
    setDeletingProductId(id);
  };

  const confirmDelete = async () => {
    if (deletingProductId === null) return;
    try {
      await productService.remove(deletingProductId);
      setProducts((prev) => prev.filter((p) => p.id !== deletingProductId));
    } catch (error) {
      console.error("Ошибка удаления:", error);
      alert("Ошибка при удалении");
    } finally {
      setDeletingProductId(null);
    }
  };

  const handleEditOpen = (id: number) => {
    const productToEdit = products.find(p => p.id === id);
    if (productToEdit) {
      setEditingProduct(productToEdit);
    }
  };

  const handleProductUpdated = (updatedProduct: Product) => {
    setProducts((prev) => 
      prev.map((p) => p.id === updatedProduct.id ? updatedProduct : p)
    );
    setEditingProduct(null);
  };

  if (!authStore.isAuth) {
    return <div className={styles.page}><p className={styles.placeholder}>Нужно авторизоваться.</p></div>;
  }

  if (!isAdmin) {
    return <div className={styles.page}><p className={styles.placeholder}>Доступ только для администратора.</p></div>;
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

      {editingProduct && (
        <AdminEditModal
          product={editingProduct}
          categories={categories}
          onSuccess={handleProductUpdated}
          onClose={() => setEditingProduct(null)}
        />
      )}

      {deletingProductId !== null && (
        <ConfirmModal
          title="Удаление товара"
          message="Вы уверены, что хотите удалить этот товар?"
          onConfirm={confirmDelete}
          onCancel={() => setDeletingProductId(null)}
        />
      )}

      <div className={styles.header}>
        <div></div> 
        <h2 className={styles.title}>Товары</h2>
        <div className={styles.headerActions}>
          <Button onClick={() => setIsCreating(true)}>+ Добавить товар</Button>
        </div>
      </div>

      <div className={styles.productsGrid}>
        {products.map((p) => (
          <AdminProductCard
            key={p.id}
            id={p.id}
            title={p.title}
            price={p.price}
            imageUrl={p.imageUrl}
            onEdit={handleEditOpen}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>
      
    </div>
  );
});