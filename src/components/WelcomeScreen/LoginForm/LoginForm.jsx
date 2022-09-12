import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import Input from "../../resources/Input/Input";
import { useNavigate } from "react-router-dom";

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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user: userName, password }),
    });
    const { user } = await data.json();

    if (user) {
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

        <button disabled={!userName} className={styles.buttonSubmit}>
          SIGN IN
        </button>
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
