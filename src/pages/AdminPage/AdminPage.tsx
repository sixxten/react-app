import React, { useEffect, useMemo, useState } from "react";
import styles from "./AdminPage.module.css";
import { observer } from "mobx-react-lite";
import { authStore } from "../../store/authStore";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { Select } from "../../ui/Select/Select";
import { categoryService, type Category } from "../../shared/services/categoryService";
import { productService, type Product } from "../../shared/services/productService";

export const AdminPage: React.FC = observer(() => {
  const isAdmin = authStore.user?.role === "admin";

  const [isCreating, setIsCreating] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<string>(""); // важно: строка для Select

  const canSubmit = useMemo(() => {
    return (
      title.trim().length > 0 &&
      categoryId !== "" &&
      price.trim().length > 0 &&
      !Number.isNaN(Number(price))
    );
  }, [title, categoryId, price]);

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

  if (!authStore.isAuth) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Админ-панель</h1>
        <p className={styles.placeholder}>Нужно авторизоваться.</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Админ-панель</h1>
        <p className={styles.placeholder}>Доступ только для администратора.</p>
      </div>
    );
  }

  const onCreate = async () => {
    if (!canSubmit || categoryId === "") return;

    const created = await productService.create({
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      categoryId: Number(categoryId),
    });

    setProducts((prev) => [created, ...prev]);

    setTitle("");
    setDescription("");
    setPrice("");
    setCategoryId("");
    setIsCreating(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.topRow}>
        <h1 className={styles.title}>Админ-панель</h1>

        <Button onClick={() => setIsCreating((v) => !v)}>
          {isCreating ? "Закрыть" : "Создать товар"}
        </Button>
      </div>

      {isCreating && (
        <div className={styles.form}>
          <Input
            label="Название"
            placeholder="Например: Наушники"
            value={title}
            onChange={setTitle}
          />

          <Input
            label="Описание"
            placeholder="Короткое описание"
            value={description}
            onChange={setDescription}
          />

          <Input
            label="Цена"
            placeholder="Например: 1999"
            type="number"
            value={price}
            onChange={setPrice}
          />

          <Select
            label="Категория"
            value={categoryId}
            onChange={setCategoryId}
            options={categories.map((c) => ({ value: c.id, label: c.name }))}
            placeholder="Выбери категорию"
          />

          <div className={styles.actions}>
            <Button onClick={onCreate} disabled={!canSubmit}>
              Создать
            </Button>
          </div>
        </div>
      )}

      <h2 className={styles.subTitle}>Товары</h2>

      <div className={styles.list}>
        {products.map((p) => (
          <div key={p.id} className={styles.item}>
            <div className={styles.itemTitle}>{p.title}</div>

            <div className={styles.itemMeta}>
               {(p.Category?.name ?? `categoryId: ${p.categoryId}`)} • {p.price} ₽
            </div>

            {p.description && (
              <div className={styles.itemDesc}>{p.description}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});



