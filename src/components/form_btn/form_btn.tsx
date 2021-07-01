import { MouseEventHandler } from "react";
import styles from "./form_btn.module.css";

type FormBtnProps = {
  text: string;
  submitting?: boolean;
  color?: string;
  onClickHandler?: MouseEventHandler;
};

const FormBtn = ({ text, color, submitting, onClickHandler }: FormBtnProps) => {
  return (
    <button
      className={`${styles.button} ${color && styles[color]}`}
      onClick={onClickHandler && onClickHandler}
      disabled={submitting}
    >
      {text}
    </button>
  );
};

export default FormBtn;
