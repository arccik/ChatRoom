import React, { useState } from "react";

import styles from "./Input.module.css";

const Input = ({ onChange, value, type = "text", placeholder }) => {
  return (
    <>
      <div className={styles.inputGroup}>
        <input
          type={type}
          name={placeholder}
          className={styles.inputStyle}
          placeholder={placeholder}
          id={placeholder}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </>
  );
};

export default Input;
