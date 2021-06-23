import { MouseEventHandler } from "react";
import styles from "./form_btn.module.css";

type FormBtnProps = {
  text: string;
  color?: string;
  onClickHandler?: MouseEventHandler;
};

const FormBtn = ({ text, color, onClickHandler }: FormBtnProps) => {
  return (
    <button
      className={`${styles.button} ${color && styles[color]}`}
      onClick={onClickHandler && onClickHandler}
    >
      {text}
    </button>
  );
};

export default FormBtn;
