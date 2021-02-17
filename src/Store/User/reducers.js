import { SET_USER, SET_USERLIST } from "./constants";

export const userReducer = (state = { user: null, userList: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return { ...state, user: payload };
    case SET_USERLIST:
      return { ...state, userList: payload };
    default:
      return state;
  }
};
