import styles from "./ChatBody.module.css";

const ChatBody = ({ messages, lastMessageRef, typingStatus }) => {
  return (
    <>
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
