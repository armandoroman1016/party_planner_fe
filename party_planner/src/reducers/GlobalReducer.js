import {
    GET_EVENTS_START,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_ERROR,
    ADDING_EVENT,
    ADD_EVENT_SUCCESS,
    ADD_EVENT_FAILURE,
    DELETING_EVENT,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_FAILURE,
    UPDATING_EVENT,
    UPDATE_EVENT_SUCCESS,
    UPDATE_EVENT_FAILURE,
    GET_SHOPPING_ITEM_START,
    GET_SHOPPING_ITEM_SUCCESS,
    GET_SHOPPING_ITEM_ERROR,
    ADD_SHOPPING_ITEM_SUCCESS,
    ADD_SHOPPING_ITEM_START,
    ADD_EVENT_TODO_START,
    ADD_EVENT_TODO_SUCCESS,
    ADD_EVENT_TODO_ERROR,
    GET_EVENT_TODO_LIST_ERROR,
    GET_EVENT_TODO_LIST_START,
    GET_EVENT_TODO_LIST_SUCCESS,
    UPDATE_EVENT_TODO_LIST_START,
    UPDATE_EVENT_TODO_LIST_SUCCESS,
    UPDATE_EVENT_TODO_LIST_ERROR,
    UPDATE_SHOPPING_ITEM_START,
    UPDATE_SHOPPING_ITEM_SUCCESS,
    UPDATE_SHOPPING_ITEM_ERROR
} from '../actions'

const initialState = {
    userId: null,
    isLoading:false,
    error: '',
    events: [],
    hasToken: false,
    shoppingListItems : [],
    todoItems: [],
    entertainmentList: [],
    purchasedItems: []
}

export const globalReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_EVENTS_START:
            return{
                ...state, 
                isLoading: true
            }
        case GET_EVENTS_SUCCESS:
            return{
                ...state,
                isLoading: false,
                events: action.payload,
            }
        case GET_EVENTS_ERROR:
            return{
                ...state,
                isLoading:false,
                error: action.payload
            }
        case ADDING_EVENT:
          return {
            ...state,
            isLoading: true,
          }
        case ADD_EVENT_SUCCESS:
          return {
            ...state,
            isLoading: false,
            events: [...state.events, action.payload]
          }
        case ADD_EVENT_FAILURE:
          return {
            ...state,
            isLoading: false,
            error: action.payload
          }
        case DELETING_EVENT:
          return {
            ...state,
            isLoading: true
          }
        case DELETE_EVENT_SUCCESS:
          return {
            ...state,
            isLoading: false,
            events: state.events.filter( event => event.id !== action.payload )
          }
        case DELETE_EVENT_FAILURE:
          return {
            ...state,
            isLoading: false,
            error: action.payload
          }
        case UPDATING_EVENT:
          return {
            ...state,
            isLoading: true
          }
        case UPDATE_EVENT_SUCCESS:
          return {
            ...state,
            isLoading: false,
            events: state.events.map(event => event.id === action.payload.id ? action.payload : event)
          }
        case UPDATE_EVENT_FAILURE:
          return {
            ...state,
            isLoading: false,
            error: action.payload
          }
        case GET_SHOPPING_ITEM_START:
          return{
            ...state,
            isLoading: true,
          }
        case GET_SHOPPING_ITEM_SUCCESS:
          return{
            ...state,
            isLoading: false,
            shoppingListItems: [...state.shoppingListItems, ...action.payload]
          }
        case GET_SHOPPING_ITEM_ERROR:
          return{
            ...state,
            isLoading: false,
            error: action.payload
          }
        case ADD_SHOPPING_ITEM_START:
          return{
            ...state, 
            isLoading: true
          }
        case ADD_SHOPPING_ITEM_SUCCESS:
          return{
            ...state,
            isLoading: false,
            shoppingListItems: [...state.shoppingListItems, action.payload]
          }
        case ADD_EVENT_TODO_START:
          return{
            ...state, 
            isLoading: true,
          }
        case ADD_EVENT_TODO_SUCCESS:
          return{
            ...state,
            todoItems:[...state.todoItems, action.payload],
            isLoading: false
          }
        case ADD_EVENT_TODO_ERROR:
          return{
            ...state, 
            error: action.payload,
            isLoading: false
          }
        case GET_EVENT_TODO_LIST_START:
          return{
            ...state,
            isLoading: true,
          }
        case GET_EVENT_TODO_LIST_SUCCESS:
          return{
            ...state,
            todoItems: action.payload,
            isLoading: false
          }
        case GET_EVENT_TODO_LIST_ERROR:
          return{
            ...state,
            error: action.payload,
            isLoading:false
          }
        case UPDATE_EVENT_TODO_LIST_START:
          return{
            ...state,
            isLoading: false,
          }
        case UPDATE_EVENT_TODO_LIST_SUCCESS:
          return{
            ...state,
            todoItems: state.todoItems.filter(item => {
              if(item.id === action.payload.id){
                return action.payload
              }else{
                return item
              }
            }),
            isLoading: false
          }
        case UPDATE_EVENT_TODO_LIST_ERROR:
          return{
            ...state, err: action.payload, isLoading:false
          }
        case UPDATE_SHOPPING_ITEM_START:
          return{
            ...state,
            isLoading: true
          }
        case UPDATE_SHOPPING_ITEM_SUCCESS:
          return{
            ...state,
            shoppingListItems: state.shoppingListItems.filter( item => item.id === action.payload.id ? action.payload : item ),
            isLoading: false
          }
        case UPDATE_SHOPPING_ITEM_ERROR:
          return{
            ...state,
            error: action.payload,
            isLoading: false,
          }
        default:
            return state;
    }
}