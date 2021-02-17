import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { userReducer } from "./User/reducers";
import { tokensReducer } from "./Tokens/reducers";
import thunk from "redux-thunk";

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  user: userReducer,
  tokens: tokensReducer,
});

export default createStore(
  rootReducer,
  composedEnhancer(applyMiddleware(thunk))
);
