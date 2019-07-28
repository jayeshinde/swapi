import {
  CHANGE_FORM,
  SET_AUTH,
  SENDING_REQUEST,
  LOGIN_REQUEST,
  LOGOUT,
  REQUEST_ERROR,
  CLEAR_ERROR,
  FETCH_PLANETS_SUCCESS,
  FETCH_PLANETS,
  FETCH_PLANETS_ERROR
} from './constants'

export function changeForm (newFormState) {
  return {type: CHANGE_FORM, newFormState}
}

export function setAuthState (newAuthState) {
  return {type: SET_AUTH, newAuthState}
}

export function sendingRequest (sending) {
  return {type: SENDING_REQUEST, sending}
}

export function loginRequest (data) {
  return {type: LOGIN_REQUEST, data}
}

export function logout () {
  return {type: LOGOUT}
}

export function requestError (error) {
  return {type: REQUEST_ERROR, error}
}

export function clearError () {
  return {type: CLEAR_ERROR}
}

export function planetsSorting (planets) {
  return {type: FETCH_PLANETS_SUCCESS, planets: planets}
}

export function fetchPlanetsError (error) {
  return {type: FETCH_PLANETS_ERROR, error: error}
}

export function fetchPlanets (search) {
  return {type: FETCH_PLANETS, search: search}
}
