import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import Input from "../../resources/Input/Input";
import { useNavigate } from "react-router-dom";
import makeRequest from "../../../hooks/makeRequest";

const LoginForm = ({ chatSocket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUserName = (value) => {
    setUserName(value);
    setError("");
  };

  const handlePassword = (value) => {
    setPassword(value);
    setError("");
  };
  const handleSignUpButton = () => {
    navigate("/signup");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { status } = await makeRequest("/login", {
      username: userName,
      password,
    });
    if (status === "ok") {
      localStorage.setItem("userName", userName);
      chatSocket.emit("newUser", {
        userName,
        socketID: chatSocket.id,
      });
      navigate("/chat");
    } else {
      setError("Given user not authorized");
    }
  };
  return (
    <form className={styles.homeContainer} onSubmit={handleSubmit}>
      <div className={styles.loginForm}>
        <h3 className={styles.loginTitle}>Login</h3>
        <Input
          value={userName}
          onChange={handleUserName}
          placeholder="Username"
        />
        <Input
          value={password}
          onChange={handlePassword}
          placeholder="Password"
          type="password"
        />
        <div className="formButtons">
          <button disabled={!userName} className={styles.submitButton}>
            Login
          </button>
          <button className={styles.submitButton} onClick={handleSignUpButton}>
            SIGN UP
          </button>
        </div>
        {error && userName && password ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          ""
        )}
      </div>
    </form>
  );
};

export default LoginForm;
