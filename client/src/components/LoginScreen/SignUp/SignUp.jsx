import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Input from "../../resources/Input/Input";
import Header from "../Header/Header";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUserName = (value) => {
    setUserName(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submit");
  };

  return (
    <div className={styles.mainContainer}>
      <Header text="SingUp" />
      <div className={styles.loginForm}>
        <Input
          value={userName}
          onChange={handleUserName}
          placeholder="Username"
        />
        <Input
          value={password}
          onChange={handlePassword}
          placeholder="Email"
          type="email"
        />
        <Input
          value={password}
          onChange={handlePassword}
          placeholder="Password"
          type="password"
        />
        <Input
          value={password}
          onChange={handlePassword}
          placeholder="Confirm Password"
          type="password"
        />
        <div className="formButtons">
          <button disabled={!userName} className={styles.submitButton}>
            Register
          </button>
          <button className={styles.submitButton} onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
