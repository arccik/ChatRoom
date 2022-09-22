import React from "react";
import Header from "./Header/Header";
import LoginForm from "./LoginForm/LoginForm";

// import styles from "./WelcomeScreen.module.css";

const WelcomeScreen = ({ socket }) => {
  return (
    <>
      <Header />
      <LoginForm chatSocket={socket} />
    </>
  );
};

export default WelcomeScreen;
