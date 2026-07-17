import React from "react";
import styles from "./NotificationsButton.module.css";
import bellIcon from "../../assets/bell.png";

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
      <img
        src={bellIcon}
        alt="Уведомления"
        className={styles.icon}
      />
      {hasUnread && <span className={styles.dot} />}
    </button>
  );
};