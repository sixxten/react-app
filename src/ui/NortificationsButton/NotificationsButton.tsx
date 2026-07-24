import React from "react";
import styles from "./NotificationsButton.module.css";
import { Bell } from "lucide-react";

type NotificationsButtonProps = {
  count?: number;
  onClick?: () => void;
};

export const NotificationsButton: React.FC<NotificationsButtonProps> = ({
  count = 0,
  onClick,
}) => {
  const hasUnread = count > 0;

  return (
    <button className={styles.button} type="button" onClick={onClick}>
      <Bell className={styles.icon} size={28} color="#333" />
      
      {hasUnread && <span className={styles.dot} />}
    </button>
  );
};
