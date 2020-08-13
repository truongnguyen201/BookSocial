import { combineReducers } from "redux";
import isLogged from "./isLogged";
import GetMainUserProfile from "./GetMainUserProfile";

const AllReducers = combineReducers({
  isLogged: isLogged,
  UserProfile: GetMainUserProfile,
});

export default AllReducers;
