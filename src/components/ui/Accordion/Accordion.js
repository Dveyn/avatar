import { useRef, useEffect } from "react";
import styles from "./Accordion.module.css";

const Accordion = ({ title, children, className, isOpen, onToggle }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isOpen) {
      el.style.height = el.scrollHeight + "px";
      const onEnd = () => {
        el.style.height = "auto";
        el.removeEventListener("transitionend", onEnd);
      };
      el.addEventListener("transitionend", onEnd);
    } else {
      // если закрываем, нужно сбросить в 0
      el.style.height = el.scrollHeight + "px"; // стартовая высота
      requestAnimationFrame(() => {
        el.style.height = "0px";
      });
    }
  }, [isOpen]);

  return (
    <div className={`${styles.accordion} ${className}`}>
      <button className={styles.header} onClick={onToggle}>
        <span className={styles.title}>{title}</span>
        <span className={isOpen ? styles.arrowOpen : styles.arrow}>&#9660;</span>
      </button>
      <div ref={contentRef} className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
