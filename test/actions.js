import test from 'ava'
import {actionTest} from 'redux-ava'
import {
  changeForm,
  setAuthState,
  sendingRequest,
  loginRequest,
  logout,
  requestError,
  clearError
} from '../app/actions'

const formState = {
  username: 'Luke Skywalker',
  password: '19BBY'
}

const error = 'Wrong password'

test('changeForm action',
  actionTest(changeForm, formState, {type: 'CHANGE_FORM', newFormState: formState}))

test('setAuthState action',
  actionTest(setAuthState, true, {type: 'SET_AUTH', newAuthState: true}))

test('sendingRequest action',
  actionTest(sendingRequest, true, {type: 'SENDING_REQUEST', sending: true}))

test('loginRequest action',
  actionTest(loginRequest, formState, {type: 'LOGIN_REQUEST', data: formState}))

test('logout action',
  actionTest(logout, formState, {type: 'LOGOUT'}))

test('requestError action',
  actionTest(requestError, error, {type: 'REQUEST_ERROR', error}))

test('clearError action',
  actionTest(clearError, error, {type: 'CLEAR_ERROR'}))
