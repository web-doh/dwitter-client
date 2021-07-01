import { memo } from "react";
import styles from "./error_banner.module.css";

type ErrorBannerProps = {
  message: string;
};

const ErrorBanner = memo(({ message }: ErrorBannerProps) => (
  <>{message && <p className={styles.banner}>{message}</p>}</>
));

export default ErrorBanner;
