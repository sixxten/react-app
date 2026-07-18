import React from "react";
import styles from "./Input.module.css";

type InputProps = {
  label?: string;
  name?: string;
  type?: string;
  value: string;
  placeholder?: string;
  error?: string;
  onChange: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  error,
  onChange,
}) => {
  let inputClass = styles.input;
  if (error) {
    inputClass += " " + styles.inputError;
  }

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
        className={inputClass}
        onChange={(e) => onChange(e.target.value)}
      />
      
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
