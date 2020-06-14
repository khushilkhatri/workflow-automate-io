import {
  SET_FILTER,
  SET_SEARCH,
  ON_STATE_CHANGE,
  DELETE_WORKFLOW,
  ADD_WORKFLOW,
  SAVE_DATA,
  SET_USER
} from "./types";

export const addFilter = (filter: string) => (dispatch: any) => {
  dispatch({
    type: SET_FILTER,
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

export const saveData = (data: any) => (dispatch: any) => {
  dispatch({
    type: SAVE_DATA,
    payload: data
  });
};

export const setUser = (user: any) => (dispatch: any) => {
  dispatch({
    type: SET_USER,
    payload: user
  });
};
