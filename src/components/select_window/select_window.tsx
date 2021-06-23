import { MouseEventHandler, useEffect } from "react";
import { SelectOptions } from "../tweet_card/tweet_card";
import styles from "./select_window.module.css";

type SelectWindowProps = {
  options: SelectOptions;
  onClose: MouseEventHandler;
};

const SelectWindow = ({ options, onClose }: SelectWindowProps) => {
  useEffect(() => {
    document.body.style.cssText = "overflow:hidden";

    return () => {
      document.body.style.cssText = "overflow: auto";
    };
  }, []);

  return (
    <section className={styles.background} onClick={onClose}>
      <ul className={styles.window} onClick={(e) => e.stopPropagation()}>
        {options.map((option) => (
          <li className={styles.option} key={option.text}>
            <button
              className={`${styles.button} ${
                option.color === "red" && styles.red
              }`}
              onClick={option.onClick}
            >
              {option.text}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SelectWindow;
