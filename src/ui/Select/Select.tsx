import React from "react";
import styles from "./Select.module.css";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  label?: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  value,
  options,
  onChange,
}) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.select}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};