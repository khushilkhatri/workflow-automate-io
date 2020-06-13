import appState from "../constant";
import {
  SET_FILTER,
  SET_SEARCH,
  ON_STATE_CHANGE,
  DELETE_WORKFLOW,
  ADD_WORKFLOW,
  SAVE_DATA
} from "../actions/types";
import { storeData } from "../../_services/workflow.service";

const reducer: any = (state: any = appState, action: any) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };

    case SET_SEARCH:
      return {
        ...state,
        search: action.payload
      };

    case ON_STATE_CHANGE: {
      let data = state.data;
      data[action.payload].state =
        data[action.payload].state === "completed" ? "pending" : "completed";
      storeData(data);
      return {
        ...state,
        data: [...data]
      };
    }

    case DELETE_WORKFLOW: {
      let data = state.data;
      data.splice(action.payload, 1);
      storeData(data);
      return {
        ...state,
        data: [...data]
      };
    }

    case ADD_WORKFLOW: {
      let data = state.data;
      data.push(action.payload);
      storeData(data);
      return {
        ...state,
        data: [...data]
      };
    }

    case SAVE_DATA: {
      let data = state.data;
      data[Number(action.payload.index)] = action.payload.data;
      storeData(data);
      return {
        ...state,
        data: data
      };
    }

    default:
      return state;
  }
};

export default reducer;
