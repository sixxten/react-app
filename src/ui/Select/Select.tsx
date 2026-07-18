import React from "react";
import styles from "./Select.module.css";

type SelectOption = {
  value: string | number;
  label: string;
};

type SelectProps = {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  name?: string;
};

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Выбери...",
  name,
}) => {
  return (
    <div className={styles.wrapper}>
      {label && <div className={styles.label}>{label}</div>}

      <select
        className={styles.select}
        name={name}
        value={String(value)}
        onChange={(e) => onChange(e.currentTarget.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={String(o.value)} value={String(o.value)}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
};