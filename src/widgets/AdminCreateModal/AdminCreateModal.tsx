import React, { useMemo, useState } from "react";
import styles from "./AdminCreateModal.module.css";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { Select } from "../../ui/Select/Select";
import { productService, type Product } from "../../shared/services/productService";
import { type Category } from "../../shared/services/categoryService";

type Props = {
  categories: Category[];
  onSuccess: (product: Product) => void;
  onClose: () => void;
};

export const AdminCreateModal: React.FC<Props> = ({ categories, onSuccess, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
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
    if (!canSubmit || categoryId === "") return;

    const created = await productService.create({
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      categoryId: Number(categoryId),
    });
    
    let finalProduct = created;
    if (imageFile) {
      finalProduct = await productService.uploadImage(created.id, imageFile);
    }

    onSuccess(finalProduct);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        
        <div className={styles.modalHeader}>
          <h3>Новый товар</h3>
          <div className={styles.closeBtnWrapper}>
            <Button onClick={onClose}>✕</Button>
          </div>
        </div>

        <div className={styles.form}>
          <Input label="Название" placeholder="Например: Наушники" value={title} onChange={setTitle} />
          <Input label="Описание" placeholder="Короткое описание" value={description} onChange={setDescription} />
          <Input label="Цена" placeholder="Например: 1999" type="number" value={price} onChange={setPrice} />
          
          <div className={styles.selectWrapperFix}>
            <Select
              label="Категория"
              value={categoryId}
              onChange={setCategoryId}
              options={categories.map((c) => ({ value: c.id, label: c.name }))}
              placeholder="Выбери категорию"
            />
          </div>

          <div className={styles.field} style={{ marginTop: "8px" }}>
            <label className={styles.imageLabel}>Изображение товара</label>
            <label className={styles.fileLabel}>
              <span>{imageFile ? "Файл выбран" : "Нажми, чтобы загрузить фото"}</span>
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
            <Button onClick={handleSubmit} disabled={!canSubmit}>Сохранить товар</Button>
          </div>
        </div>
      </div>
    </div>
  );
};