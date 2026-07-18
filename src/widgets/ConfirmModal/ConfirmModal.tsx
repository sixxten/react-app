import React from "react";
import styles from "./ConfirmModal.module.css";
import { Button } from "../../ui/Button/Button";

type Props = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal: React.FC<Props> = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
        
        <div className={styles.actions}>
          <Button onClick={onCancel} className={styles.cancelBtn}>
            Отмена
          </Button>
          <Button onClick={onConfirm} className={styles.confirmBtn}>
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
};