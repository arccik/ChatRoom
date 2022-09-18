import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { StoreContext, ACTION_TYPES } from "../../store/store-context";

import styles from "./ChatBody.module.css";

const ChatBody = ({ messages, lastMessageRef, typingStatus }) => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(StoreContext);

  const hadleMenuButton = () => {
    dispatch({
      type: ACTION_TYPES.OPEN_SIDEBAR,
      payload: { sideBar: !state.sideBar },
    });
    console.log("Handle Menu Button", state);
  };
  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header className={styles.chatMainHeader}>
        <span className={styles.openSideBarButton} onClick={hadleMenuButton}>
          ☰
        </span>
        <p>Hangout with Colleagues</p>
        <button className={styles.leaveChatBtn} onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className={styles.messageContainer}>
        {messages.map((message) =>
          message.name === localStorage.getItem("userName") ? (
            <div className={styles.messageChats} key={message.id}>
              <p className={styles.senderName}>You</p>
              <div className={styles.messageSnder}>
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className={styles.messageChats} key={message.id}>
              <p>{message.name}</p>
              <div className={styles.messageRecipient}>
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className={styles.messageStatus}>
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
