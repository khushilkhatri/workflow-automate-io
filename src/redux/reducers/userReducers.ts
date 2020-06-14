import appState from "../constant";
import { SET_USER } from "../actions/types";

const reducer: any = (state: any = appState.user, action: any) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
