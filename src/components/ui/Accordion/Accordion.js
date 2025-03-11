import { useState } from "react";
import styles from "./Accordion.module.css";

const Accordion = ({ title, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.accordion} ${className}`}>
      <button className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        {title}
        <span className={isOpen ? styles.arrowOpen : styles.arrow}>&#9660;</span>
      </button>
      <div className={`${styles.content} ${isOpen ? styles.open : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
