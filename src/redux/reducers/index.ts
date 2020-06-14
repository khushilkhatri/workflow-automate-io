import { combineReducers } from "redux";
import workflowReducers from "./workflowReducers";
import userReducers from "./userReducers";

const rootReducer = combineReducers({
  workflow: workflowReducers,
  user: userReducers
});

export default rootReducer;
