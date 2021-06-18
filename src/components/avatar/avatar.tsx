import React, { memo } from "react";
import styles from "./avatar.module.css";

type AvatarProps = {
  url?: string;
  name: string;
};

const Avatar = memo(({ url, name }: AvatarProps) => (
  <div>
    {url ? (
      <img src={url} alt="avatar" className={styles.image} />
    ) : (
      <div className={styles.text}>{name.charAt(0)}</div>
    )}
  </div>
));

export default Avatar;
