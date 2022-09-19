import React from "react";

import styles from "./header.module.css";

const Header = ({ text = "CHATROOM" }) => {
  const textArray = text.split("");
  return (
    <div className={styles.lettersContainer}>
      {textArray.map((letter, index) => (
        <span key={letter + index * 2}>{letter}</span>
      ))}
    </div>
  );
};

export default Header;
