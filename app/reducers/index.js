import {
  CHANGE_FORM,
  SET_AUTH,
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  FETCH_PLANETS,
  FETCH_PLANETS_SUCCESS,
  FETCH_PLANETS_ERROR
} from '../actions/constants'
import auth from '../auth'

let initialState = {
  formState: {
    username: '',
    password: ''
  },
  error: '',
  currentlySending: false,
  loggedIn: auth.loggedIn(),
  pending: false,
  search: '',
  planets: []
}

// Takes care of changing the application state
function reducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM:
      return {...state, formState: action.newFormState}
    case SET_AUTH:
      return {...state, loggedIn: action.newAuthState}
    case SENDING_REQUEST:
      return {...state, currentlySending: action.sending}
    case REQUEST_ERROR:
      return {...state, error: action.error}
    case CLEAR_ERROR:
      return {...state, error: ''}
    case FETCH_PLANETS:
      return {...state, pending: true, search: action.search}
    case FETCH_PLANETS_SUCCESS:
      return {...state, pending: false, planets: action.planets}
    case FETCH_PLANETS_ERROR:
      return {...state, pending: false, error: action.error}
    default:
      return state
  }
}

export default reducer
