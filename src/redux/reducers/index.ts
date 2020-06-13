import { combineReducers } from "redux";
import workflowReducers from "./workflowReducers";

const rootReducer = combineReducers({
  workflow: workflowReducers
});

export default rootReducer;
