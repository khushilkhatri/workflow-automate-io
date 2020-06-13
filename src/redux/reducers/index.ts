import { combineReducers } from "redux";
import reducers from "./reducers";

const rootReducer = combineReducers({
  workflow: reducers
});

export default rootReducer;
