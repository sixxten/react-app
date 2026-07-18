import React, { useMemo, useState } from "react";
import styles from "./AdminEditModal.module.css";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { Select } from "../../ui/Select/Select";
import { productService, type Product } from "../../shared/services/productService";
import { type Category } from "../../shared/services/categoryService";

type Props = {
  product: Product;
  categories: Category[];
  onSuccess: (updatedProduct: Product) => void;
  onClose: () => void;
};

export const AdminEditModal: React.FC<Props> = ({ product, categories, onSuccess, onClose }) => {

  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description || "");
  const [price, setPrice] = useState(String(product.price));
  const [categoryId, setCategoryId] = useState<string>(String(product.categoryId));
  const [imageFile, setImageFile] = useState<File | null>(null);

  const canSubmit = useMemo(() => {
    return (
      title.trim().length > 0 &&
      categoryId !== "" &&
      price.trim().length > 0 &&
      !Number.isNaN(Number(price))
    );
  }, [title, categoryId, price]);

  const handleSubmit = async () => {
    if (!canSubmit) return;

    try {
      let updatedProduct = await productService.update(product.id, {
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        categoryId: Number(categoryId),
      });

      if (imageFile) {
        updatedProduct = await productService.uploadImage(product.id, imageFile);
      }

      onSuccess(updatedProduct);
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      alert("Ошибка при сохранении изменений");
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        
        <div className={styles.modalHeader}>
          <h3>Редактировать товар</h3>
          <div className={styles.closeBtnWrapper}>
            <Button onClick={onClose}>✕</Button>
          </div>
        </div>

        <div className={styles.form}>
          <Input label="Название" value={title} onChange={setTitle} />
          <Input label="Описание" value={description} onChange={setDescription} />
          <Input label="Цена" type="number" value={price} onChange={setPrice} />
          
          <div className={styles.selectWrapperFix}>
            <Select
              label="Категория"
              value={categoryId}
              onChange={setCategoryId}
              options={categories.map((c) => ({ value: String(c.id), label: c.name }))}
            />
          </div>

          <div className={styles.field} style={{ marginTop: "12px" }}>
            <label className={styles.imageLabel}>Новое изображение (оставь пустым, если не меняешь)</label>
            <label className={styles.fileLabel}>
              <span>{imageFile ? "Выбран новый файл" : "Нажми, чтобы изменить фото"}</span>
              {imageFile && <span className={styles.fileName}>{imageFile.name}</span>}
              <input 
                type="file" 
                accept="image/*" 
                className={styles.fileInput}
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} 
              />
            </label>
          </div>

          <div className={styles.actions}>
            <Button onClick={handleSubmit} disabled={!canSubmit}>
              Сохранить изменения
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};