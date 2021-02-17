import { SET_TOKENS } from "./constants";

export const tokensReducer = (
  state = { access_token: null, refresh_token: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TOKENS:
      return {
        access_token: payload.access_token,
        refresh_token: payload.refresh_token,
      };
    default:
      return state;
  }
};
