import { combineReducers } from "redux";
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer";
import taskReducer from "./taskReducer";

export default combineReducers({
  users: userReducer,
  categories: categoryReducer,
  tasks: taskReducer,
});
