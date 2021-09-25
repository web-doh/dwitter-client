import { Twitter } from "react-feather";
import styles from "./loading_spinner.module.css";

type LoadingSpinnerProps = {
  size: string;
};
const LoadingSpinner = ({ size }: LoadingSpinnerProps) => (
  <span className={styles.img}>
    <Twitter size={size} />
  </span>
);

export default LoadingSpinner;
