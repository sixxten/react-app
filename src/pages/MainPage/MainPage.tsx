import React, { useEffect, useMemo, useState } from "react";
import styles from "./MainPage.module.css";
import { Input } from "../../ui/Input/Input";
import { Select } from "../../ui/Select/Select";
import { categoryService, type Category } from "../../shared/services/categoryService";
import { productService, type Product } from "../../shared/services/productService";
import { ProductCard } from "../../widgets/ProductCard/ProductCard";

export const MainPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(() => {
    (async () => {
      const [cats, prods] = await Promise.all([
        categoryService.getAll(),
        productService.getAll(),
      ]);
      setCategories(cats);
      setProducts(prods);
    })();
  }, []);

  const categoryOptions = useMemo(
    () => categories.map((c) => ({ value: c.id, label: c.name })),
    [categories]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const catId = categoryId ? Number(categoryId) : null;

    return products.filter((p) => {
      const matchesQuery =
        q.length === 0 || p.title.toLowerCase().includes(q);

      const matchesCategory = catId === null ? true : p.categoryId === catId;

      return matchesQuery && matchesCategory;
    });
  }, [products, query, categoryId]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Интернет магазин</h1>

          <div className={styles.controls}>
            <Input
              placeholder="Найти товар..."
              value={query}
              onChange={setQuery}
            />

            <Select
              value={categoryId}
              onChange={setCategoryId}
              options={categoryOptions}
              placeholder="Все категории"
            />
          </div>
        </div>
      </header>

      <div className={styles.grid}>
        {filtered.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            title={p.title}
            price={p.price}
            imageUrl={p.imageUrl ? "http://localhost:5000" + p.imageUrl : undefined}
          />
        ))}
      </div>

    </div>
  );
};
