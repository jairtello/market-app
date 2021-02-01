import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  userReducer,
  productReducer,
  loginReducer,
} from "./reducers";

export default createStore(
  combineReducers({
    userReducer,
    productReducer,
    loginReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
