import { axiosWithAuth } from '../utils/AxiosWithAuth';

export const ADDING_EVENT = "ADDING_EVENT";
export const ADD_EVENT_SUCCESS = "ADD_EVENT_SUCCESS";
export const ADD_EVENT_FAILURE = "ADD_EVENT_FAILURE";


const URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

export const addEvent = (event, userId) => {
  return async dispatch => {
    dispatch({ type: ADDING_EVENT});
    axiosWithAuth()
      .post(`${URL}/api/events/${userId}`, event)
        .then(res => {
          dispatch({ type: ADD_EVENT_SUCCESS, payload: res.data.event })
        })
        .catch(err => {
          dispatch({ type: ADD_EVENT_FAILURE, payload: err.response })
        })
  }
}