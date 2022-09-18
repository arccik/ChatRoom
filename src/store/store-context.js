import { createContext, useReducer } from "react";

export const StoreContext = createContext();

export const ACTION_TYPES = {
  OPEN_SIDEBAR: "OPEN_SIDEBAR",
  SET_USER: "SET_USER",
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.OPEN_SIDEBAR: {
      return { ...state, sideBar: action.payload.sideBar };
    }
    case ACTION_TYPES.SET_USER: {
      return { ...state, user: action.payload.user };
    }
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
};

const StoreProvider = ({ children }) => {
  const initialState = {
    sideBar: false,
    user: {},
  };
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
