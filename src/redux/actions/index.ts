import {
  SET_CHECKIN_TYPE,
  SET_SEARCH,
  ON_STATE_CHANGE,
  DELETE_WORKFLOW,
  ADD_WORKFLOW
} from "./types";

export const registrations = (filter: string) => (dispatch: any) => {
  dispatch({
    type: SET_CHECKIN_TYPE,
    payload: filter
  });
};

export const searchFilter = (search: string) => (dispatch: any) => {
  dispatch({
    type: SET_SEARCH,
    payload: search
  });
};

export const onStateChange = (index: any) => (dispatch: any) => {
  dispatch({
    type: ON_STATE_CHANGE,
    payload: index
  });
};

export const deleteWorkflow = (index: any) => (dispatch: any) => {
  dispatch({
    type: DELETE_WORKFLOW,
    payload: index
  });
};

export const addWorkflow = (data: any) => (dispatch: any) => {
  dispatch({
    type: ADD_WORKFLOW,
    payload: data
  });
};
