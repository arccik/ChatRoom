import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import Input from "../../resources/Input/Input";
import { useNavigate } from "react-router-dom";
import makeRequest, { tokenValidation } from "../../../services/makeRequest";

const LoginForm = ({ chatSocket }) => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
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

    const { token, message } = await makeRequest("/login", {
      username: username,
      password,
    });
    if (token) {
      const { status } = await tokenValidation(token);
      if (status === "OK") {
        localStorage.setItem("userName", username);
        chatSocket.emit("newUser", {
          username,
          socketID: chatSocket.id,
        });
        navigate("/chat");
      }
    } else {
      setError(message);
    }
  };
  return (
    <form className={styles.homeContainer} onSubmit={handleSubmit}>
      <div className={styles.loginForm}>
        <h3 className={styles.loginTitle}>Login</h3>
        <Input
          value={username}
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
          <button disabled={!username} className={styles.submitButton}>
            Login
          </button>
          <button className={styles.submitButton} onClick={handleSignUpButton}>
            SIGN UP
          </button>
        </div>
        {error && username && password ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          ""
        )}
      </div>
    </form>
  );
};

export default LoginForm;
