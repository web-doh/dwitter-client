import { memo } from "react";
import styles from "./avatar.module.css";

type AvatarProps = {
  url?: string;
  name: string;
};

const Avatar = memo(({ url, name }: AvatarProps) => {
  if (url) {
    return <img src={url} alt="avatar" className={styles.image} />;
  } else {
    return <div className={styles.text}>{name.charAt(0).toUpperCase()}</div>;
  }
});

export default Avatar;
