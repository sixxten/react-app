import React from "react";
import styles from "./Input.module.css";

type InputProps = {
  label?: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        className={styles.input}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};