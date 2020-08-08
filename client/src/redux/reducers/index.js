import { combineReducers } from "redux";
import isLogged from "./isLogged";
import response from "./response";

const AllReducers = combineReducers({
  isLogged: isLogged,
  response: response,
});

export default AllReducers;
