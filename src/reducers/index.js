import { combineReducers } from "redux";
import authReducer from "./AuthReducers";
import web3Reducer from "./web3Reducer";
import accountsReducer from "./accountsReducer";
import contractReducer from "./contractReducer";
import accountTypeReducer from "./accountTypeReducer";

export default combineReducers({
  auth: authReducer,
  accounts: accountsReducer,
  contract: contractReducer,
  web3: web3Reducer,
  typee: accountTypeReducer
});