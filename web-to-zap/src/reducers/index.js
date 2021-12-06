import { combineReducers } from "redux";
import userReducer from "./userReducer";
import dashboardReducer from "./dashboardReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
  users: userReducer,
  dashboard: dashboardReducer,
  categories: categoryReducer,
});
