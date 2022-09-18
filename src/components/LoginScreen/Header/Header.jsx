import React from "react";

import styles from "./header.module.css";

const Header = ({ text = "CHATROOM" }) => {
  const textArray = text.split("");
  return (
    <div className={styles.lettersContainer}>
      {textArray.map((letter, index) => (
        <>
          {console.log(letter + index * 2)}
          <span keys={letter + index * 2}>{letter}</span>
        </>
      ))}
    </div>
  );
};

export default Header;
