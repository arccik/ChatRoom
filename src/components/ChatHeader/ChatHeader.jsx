import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext, ACTION_TYPES } from "../../store/store-context";

import styles from "./ChatHeader.module.css";

const ChatHeader = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(StoreContext);

  const hadleMenuButton = () => {
    dispatch({
      type: ACTION_TYPES.OPEN_SIDEBAR,
      payload: { sideBar: !state.sideBar },
    });
  };
  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className={styles.chatMainHeader}>
      <span className={styles.openSideBarButton} onClick={hadleMenuButton}>
        ☰
      </span>
      <p>Those Who know</p>
      <button className={styles.leaveChatBtn} onClick={handleLeaveChat}>
        LEAVE CHAT
      </button>
    </header>
  );
};

export default ChatHeader;
