import appState from "../constant";
import { SAVE_DATA } from "../actions/types";
import { storeData } from "../../_services/workflow.service";

const reducer: any = (state: any = appState, action: any) => {
  switch (action.type) {
    case SAVE_DATA: {
      let data = state.data;
      data[action.payload.index] = action.payload.data;
      storeData(data);
      return {
        ...state,
        data: data
      };
    }
    default:
      return appState;
  }
};

export default reducer;
