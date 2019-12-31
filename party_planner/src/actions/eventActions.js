import { axiosWithAuth } from '../utils/AxiosWithAuth'

export const GET_EVENTS_START = "GET_EVENTS_START"
export const GET_EVENTS_SUCCESS = "GET_EVENTS_SUCCESS"
export const GET_EVENTS_ERROR = "GET_EVENTS_ERROR"

export const DELETING_EVENT = "DELETING_EVENT"
export const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS"
export const DELETE_EVENT_FAILURE = "DELETE_EVENT_FAILURE"

export const UPDATING_EVENT = "UPDATING_EVENT"
export const UPDATE_EVENT_SUCCESS = "UPDATE_EVENT_SUCCESS"
export const UPDATE_EVENT_FAILURE = "UPDATE_EVENT_FAILURE"




// get full list of events

export const getEvents = () => {
  return dispatch => {
    dispatch({ type: GET_EVENTS_START })
    axiosWithAuth()
      .get('https://bw-party-planner.herokuapp.com/api/party')
      .then(res => dispatch({ type: GET_EVENTS_SUCCESS, payload: res.data }))
      .catch(err => dispatch({ type: GET_EVENTS_ERROR, payload: err.response }))
  }
}

// delete event

export const deleteEvent = (event, history) => {
  return dispatch => {
    dispatch({ type: DELETING_EVENT })
    axiosWithAuth()
      .delete(`https://bw-party-planner.herokuapp.com/api/party/${event.id}`)
      .then(res => {
        dispatch({ type: DELETE_EVENT_SUCCESS, payload: event });
        history.push(`/dashboard/${localStorage.getItem('user_id')}`)
      })
      .catch(err => dispatch({ type: DELETE_EVENT_FAILURE, payload: err.response }))
  }
}

// update event

export const updateEvent = (event, id, history) => {
  return dispatch => {
    dispatch({ type: UPDATING_EVENT })
    axiosWithAuth()
      .put(`https://bw-party-planner.herokuapp.com/api/party/${id}`, event)
      .then(res => {
        dispatch({ type: UPDATE_EVENT_SUCCESS, payload: res.data })
      })
      .catch(err => {
        dispatch({ type: UPDATE_EVENT_FAILURE, payload: err.response})
      })
  }
}

//! CRUD FOR SHOPPING LIST

export const CREATE_EVENT_SHOPPING_LIST_START = "CREATE_EVENT_SHOPPING_LIST_START"
export const CREATE_EVENT_SHOPPING_LIST_SUCCESS = "CREATE_EVENT_SHOPPING_LIST_SUCCESS"
export const CREATE_EVENT_SHOPPING_LIST_ERROR = "CREATE_EVENT_SHOPPING_LIST_ERROR"

export const createEventShoppingList = values => {
  return dispatch =>{
    dispatch({type: CREATE_EVENT_SHOPPING_LIST_START})
    axiosWithAuth()
      .post('https://bw-party-planner.herokuapp.com/api/shoppinglist', values)
      .then( res => console.log(res))
      .catch( err => console.log(err))
  }
}

// ! CRUD for shopping list items

export const ADD_SHOPPING_ITEM_START = "ADD_SHOPPING_ITEM_START"
export const ADD_SHOPPING_ITEM_SUCCESS = "ADD_SHOPPING_ITEM_SUCCESS"
export const ADD_SHOPPING_ITEM_ERROR = "ADD_SHOPPING_ITEM_ERROR"

export const addShoppingItem = values => {
  return dispatch => {
    dispatch({type: ADD_SHOPPING_ITEM_START})
      axiosWithAuth()
      .post('https://bw-party-planner.herokuapp.com/api/items', values)
      .then( res => dispatch({type: ADD_SHOPPING_ITEM_SUCCESS, payload: res.data}))
      .catch( err => console.log('errOnPostItem', err))
  }
}

export const GET_SHOPPING_ITEM_START = "GET_SHOPPING_ITEM_START"
export const GET_SHOPPING_ITEM_SUCCESS = "GET_SHOPPING_ITEM_SUCCESS"
export const GET_SHOPPING_ITEM_ERROR = "GET_SHOPPING_ITEM_ERROR"

export const getShoppingItems = () => {
  return dispatch => {
    dispatch({type: GET_SHOPPING_ITEM_START})
    axiosWithAuth()
    .get('https://bw-party-planner.herokuapp.com/api/items')
    .then( res => dispatch({type: GET_SHOPPING_ITEM_SUCCESS, payload: res.data}))
    .catch( err => dispatch({type: GET_SHOPPING_ITEM_ERROR, payload: err.response}))
  }
}

export const UPDATE_SHOPPING_ITEM_START = "UPDATE_SHOPPING_ITEM_START"
export const UPDATE_SHOPPING_ITEM_SUCCESS = "UPDATE_SHOPPING_ITEM_SUCCESS"
export const UPDATE_SHOPPING_ITEM_ERROR = "UPDATE_SHOPPING_ITEM_ERROR"

export const updateShoppingItems = (arr) => {

  for(let i = 0; i < arr.length; i++ ){
    let valuesToSubmit = {
      name: arr[i].name,
      purchased: arr[i].purchased,
      shopping_list_id: arr[i].shopping_list_id,
      price: arr[i].price
    }
    return dispatch => {
      dispatch({type: UPDATE_SHOPPING_ITEM_START})
      axiosWithAuth()
        .put(`https://bw-party-planner.herokuapp.com/api/items/${arr[i].id}`, valuesToSubmit)
        .then( res => dispatch({type: UPDATE_SHOPPING_ITEM_SUCCESS, payload: res.data}))
        .catch( err => dispatch({type: UPDATE_SHOPPING_ITEM_ERROR, payload: err.response}))
   } 
  }
}

//!! CRUD FOR TODOLIST 
export const CREATE_EVENT_TODO_LIST_START = "CREATE_EVENT_TODO_LIST_START"
export const CREATE_EVENT_TODO_LIST_SUCCESS = "CREATE_EVENT_TODO_LIST_SUCCESS"
export const CREATE_EVENT_TODO_LIST_ERROR = "CREATE_EVENT_TODO_LIST_ERROR"

export const createEventTodoList = values => {
  return dispatch =>{
    dispatch({type: CREATE_EVENT_TODO_LIST_START})
    axiosWithAuth()
      .post('https://bw-party-planner.herokuapp.com/api/todolist', values)
      .then( res => console.log(res))
      .catch( err => console.log(err))
  }
}

export const ADD_EVENT_TODO_START = "ADD_EVENT_TODO_START"
export const ADD_EVENT_TODO_SUCCESS = "ADD_EVENT_TODO_SUCCESS"
export const ADD_EVENT_TODO_ERROR = "ADD_EVENT_TODO_ERROR"

export const addEventTodo = values => {
  return dispatch =>{
    dispatch({type: ADD_EVENT_TODO_START})
    axiosWithAuth()
      .post('https://bw-party-planner.herokuapp.com/api/todo', values)
      .then( res => dispatch({type: ADD_EVENT_TODO_SUCCESS, payload: res.data}))
      .catch( err => dispatch({type: ADD_EVENT_TODO_ERROR, payload: err.response}))
  }
}

export const GET_EVENT_TODO_LIST_START = "GET_EVENT_TODO_LIST_START"
export const GET_EVENT_TODO_LIST_SUCCESS = "GET_EVENT_TODO_LIST_SUCCESS"
export const GET_EVENT_TODO_LIST_ERROR = "GET_EVENT_TODO_LIST_ERROR"

export const getEventTodoList = () => {
  return dispatch =>{
    dispatch({type: GET_EVENT_TODO_LIST_START})
    axiosWithAuth()
      .post('https://bw-party-planner.herokuapp.com/api/todolist')
      .then( res => dispatch({type: GET_EVENT_TODO_LIST_SUCCESS, payload: res.data}))
      .catch( err => dispatch({type: GET_EVENT_TODO_LIST_ERROR, payload: err.response}))
  }
}

export const UPDATE_EVENT_TODO_LIST_START = "UPDATE_EVENT_TODO_LIST_START"
export const UPDATE_EVENT_TODO_LIST_SUCCESS = "UPDATE_EVENT_TODO_LIST_SUCCESS"
export const UPDATE_EVENT_TODO_LIST_ERROR = "UPDATE_EVENT_TODO_LIST_ERROR"

export const updateToDoList = ( arr ) => {
  for(let i = 0; i < arr.length; i++ ){
    let valuesToSubmit = {
      name: arr[i].name,
      completed: arr[i].completed,
      todo_list_id: arr[i].todo_list_id
    }
    return dispatch => {
      dispatch({type: UPDATE_EVENT_TODO_LIST_START})
      axiosWithAuth()
        .put(`https://bw-party-planner.herokuapp.com/api/todo/${arr[i].id}`, valuesToSubmit)
        .then( res => dispatch({type: UPDATE_EVENT_TODO_LIST_SUCCESS, payload: res.data}))
        .catch( err => console.log(err))
   } 
  }
}

// ! Entertainment CRUD

export const ADD_EVENT_ENTERTAINMENT_START = "ADD_EVENT_ENTERTAINMENT_START"
export const ADD_EVENT_ENTERTAINMENT_SUCCESS = "ADD_EVENT_ENTERTAINMENT_SUCCESS"
export const ADD_EVENT_ENTERTAINMENT_ERROR = "ADD_EVENT_ENTERTAINMENT_ERROR"


export const addEntertainment = (values) => {
  return dispatch => {
    dispatch({type: ADD_EVENT_ENTERTAINMENT_START})
    axiosWithAuth()
      .post('https://bw-party-planner.herokuapp.com/api/entertainment', values)
      .then( res => dispatch({type:ADD_EVENT_ENTERTAINMENT_SUCCESS, payload: res.data}))
      .catch( err => dispatch({ type : ADD_EVENT_ENTERTAINMENT_ERROR, payload: err.response}))
  }
}

export const GET_EVENTS_ENTERTAINMENT_START = "GET_EVENT_ENTERTAINMENT_START"
export const GET_EVENTS_ENTERTAINMENT_SUCCESS = "GET_EVENT_ENTERTAINMENT_SUCCESS"
export const GET_EVENTS_ENTERTAINMENT_ERROR = "GET_EVENT_ENTERTAINMENT_ERROR"

export const getEventEntertainment = () => {
  return dispatch => {
  dispatch({type: GET_EVENTS_ENTERTAINMENT_START})
  axiosWithAuth()
    .get('https://bw-party-planner.herokuapp.com/api/entertainment')
    .then(res => dispatch({type: GET_EVENTS_ENTERTAINMENT_SUCCESS, payload: res.data}))
    .catch(err => dispatch({type: GET_EVENTS_ENTERTAINMENT_ERROR, payload: err.response}))
  }
}

export const UPDATE_ENTERTAINMENT_ITEMS_START = "UPDATE_ENTERTAINMENT_ITEM_START"
export const UPDATE_ENTERTAINMENT_ITEMS_SUCCESS = "UPDATE_ENTERTAINMENT_ITEM_SUCCESS"
export const UPDATE_ENTERTAINMENT_ITEMS_ERROR = "UPDATE_ENTERTAINMENT_ITEM_ERROR"

export const updateEntertainmentItems = (arr) => {

  for(let i = 0; i < arr.length; i++ ){
    let valuesToSubmit = {
      name: arr[i].name,
      completed: arr[i].completed,
      todo_list_id: arr[i].todo_list_id,
      price: arr[i].price
    }
    return dispatch => {
      dispatch({type: UPDATE_ENTERTAINMENT_ITEMS_START})
      axiosWithAuth()
        .put(`https://bw-party-planner.herokuapp.com/api/entertainment/${arr[i].id}`, JSON.stringify(valuesToSubmit))
        .then( res => dispatch({type: UPDATE_ENTERTAINMENT_ITEMS_SUCCESS, payload: res.data}))
        .catch( err => dispatch({type: UPDATE_ENTERTAINMENT_ITEMS_ERROR, payload: err.response}))
   } 
  }

}

export const DELETE_ENTERTAINMENT_ITEMS_START = "DELETE_ENTERTAINMENT_ITEM_START"
export const DELETE_ENTERTAINMENT_ITEMS_SUCCESS = "DELETE_ENTERTAINMENT_ITEM_SUCCESS"
export const DELETE_ENTERTAINMENT_ITEMS_ERROR = "DELETE_ENTERTAINMENT_ITEM_ERROR"

export const deleteEntertainmentItem = id => {
   return dispatch => {
      dispatch({type: DELETE_ENTERTAINMENT_ITEMS_START})
      axiosWithAuth()
        .delete(`https://bw-party-planner.herokuapp.com/api/entertainment/${id}`)
        .then( res => dispatch({type: DELETE_ENTERTAINMENT_ITEMS_SUCCESS, payload: id}))
        .catch( err => dispatch({type: DELETE_ENTERTAINMENT_ITEMS_ERROR, payload: err.response}))
  }
}



