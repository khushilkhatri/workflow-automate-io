import { combineReducers } from "redux";
import workflowReducers from "./workflowReducers";
import nodesReducer from "./nodesReducers";

const rootReducer = combineReducers({
  workflow: workflowReducers,
  nodes: nodesReducer
});

export default rootReducer;
