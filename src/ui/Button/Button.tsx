import React from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "link";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  disabled,
  variant = "primary",
  className,
}) => {
  const classes = [
    styles.button,
    variant === "primary" ? styles.buttonPrimary : "",
    variant === "link" ? styles.buttonLink : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
};