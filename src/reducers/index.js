import { combineReducers } from "redux";
import authReducer from "./AuthReducers";

export default combineReducers({
  auth: authReducer
});