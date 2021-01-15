import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { postReducer, userReducer, productReducer } from "./reducers";

export default createStore(
  combineReducers({
    postReducer,
    userReducer,
    productReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
