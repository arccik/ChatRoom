import React, { useState, useEffect, useContext } from "react";

import styles from "./ChatBar.module.css";
import { StoreContext } from "../../store/store-context";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  const { state } = useContext(StoreContext);

  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);

  return (
    <div
      className={state.sideBar ? styles.chatSidebar : styles.chatSideBarHidden}
    >
      <div>
        <h4 className={styles.chatHeader}>ACTIVE USERS</h4>
        <div className={styles.chatUsers}>
          {users.map((user) => (
            <span key={user.socketID} className={styles.onlineUsers}>
              {user.userName}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
