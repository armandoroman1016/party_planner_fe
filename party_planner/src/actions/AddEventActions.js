import { axiosWithAuth } from '../utils/AxiosWithAuth';

export const ADDING_EVENT = "ADDING_EVENT";
export const ADD_EVENT_SUCCESS = "ADD_EVENT_SUCCESS";
export const ADD_EVENT_FAILURE = "ADD_EVENT_FAILURE";

export const addEvent = (event, history, match) => {
  return dispatch => {
    dispatch({ type: ADDING_EVENT});
    axiosWithAuth()
      .post('https://bw-party-planner.herokuapp.com/api/party', event)
        .then(res => {
          history.push(`/dashboard/${match.params.id}`)
          return ({ type: ADD_EVENT_SUCCESS, payload: res.data })
        })
        .catch(err => {
          return ({ type: ADD_EVENT_FAILURE, payload: err.response })
        })
  }
}