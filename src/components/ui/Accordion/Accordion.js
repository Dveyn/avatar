import { useRef, useState } from "react";
import styles from "./Accordion.module.css";

const Accordion = ({ title, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const accordionRef = useRef(null);

  const toggle = () => {
    const el = contentRef.current;
    const accordion = accordionRef.current;
    if (!el) return;

    if (isOpen) {
      el.style.height = el.scrollHeight + "px";
      accordion.style.minHeight = el.scrollHeight+ 30 + "px";
      requestAnimationFrame(() => {
        el.style.height = "0px";
        accordion.style.minHeight = "30px";
      });
    } else {
      el.style.height = el.scrollHeight + "px";
      accordion.style.minHeight = el.scrollHeight+ 30 + "px";
      const onEnd = () => {
        el.style.height = "auto";
        accordion.style.minHeight = "30px";
        el.removeEventListener("transitionend", onEnd);
      };
      el.addEventListener("transitionend", onEnd);
    }

    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.accordion} ${className}`} ref={accordionRef}>
      <button className={styles.header} onClick={toggle}>
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
