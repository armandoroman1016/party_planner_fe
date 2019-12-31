import { axiosWithAuth } from '../utils/AxiosWithAuth';

export const ADDING_EVENT = "ADDING_EVENT";
export const ADD_EVENT_SUCCESS = "ADD_EVENT_SUCCESS";
export const ADD_EVENT_FAILURE = "ADD_EVENT_FAILURE";

export const addEvent = (event) => {
  return dispatch => {
    dispatch({ type: ADDING_EVENT});
    axiosWithAuth()
      .post('https://bw-party-planner.herokuapp.com/api/party', event)
        .then(res => {
          dispatch({ type: ADD_EVENT_SUCCESS, payload: res.data })
        })
        .catch(err => {
          dispatch({ type: ADD_EVENT_FAILURE, payload: err.response })
        })
  }
}