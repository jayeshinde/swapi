import {hashSync} from 'bcryptjs'
import genSalt from '../auth/salt'
import {browserHistory} from 'react-router'
import {take, call, put, race, takeEvery, select} from 'redux-saga/effects'
import auth from '../auth'
import {
  SENDING_REQUEST,
  LOGIN_REQUEST,
  SET_AUTH,
  LOGOUT,
  CHANGE_FORM,
  REQUEST_ERROR,
  FETCH_PLANETS,
  FETCH_PLANETS_SUCCESS
} from '../actions/constants'

const api = 'https://swapi.co/api'
const planetsSearch = '/planets/?search='

export function * searchPlanet () {
  try {
    const { search } = yield select()
    const url = `${api}${planetsSearch}${search.searchword}`
    const d = yield window.fetch(url)
      .then(res => res.json())
      .then(json => json.results)
    yield put({ type: FETCH_PLANETS_SUCCESS, planets: d })
    yield call(planetsSorting, {d})
  } catch (error) {
    yield put({type: REQUEST_ERROR, error: error.message})
  }
}

export function * planetsSorting (planets) {
  const min = planets.d.reduce(function (prev, curr) {
    return prev.population < curr.population ? prev : curr
  })
  planets.d.forEach(function (x) {
    if (x.population !== 'unknown') {
      x.size = x.population / min.population
    } else {
      x.size = 1
    }
  })
}

export function * authorize ({username, password}) {
  yield put({type: SENDING_REQUEST, sending: true})
  try {
    const salt = genSalt(username)
    const hash = hashSync(password, salt)
    const response = yield call(auth.login, username, hash)
    return response
  } catch (error) {
    yield put({type: REQUEST_ERROR, error: error.message})
    return false
  } finally {
    yield put({type: SENDING_REQUEST, sending: false})
  }
}

export function * logout () {
  yield put({type: SENDING_REQUEST, sending: true})
  try {
    const response = yield call(auth.logout)
    yield put({type: SENDING_REQUEST, sending: false})
    return response
  } catch (error) {
    yield put({type: REQUEST_ERROR, error: error.message})
  }
}

export function * loginFlow () {
  while (true) {
    const request = yield take(LOGIN_REQUEST)
    const {username, password} = request.data
    const winner = yield race({
      auth: call(authorize, {username, password}),
      logout: take(LOGOUT)
    })

    if (winner.auth) {
      yield put({type: SET_AUTH, newAuthState: true})
      yield put({type: CHANGE_FORM, newFormState: {username: '', password: ''}})
      forwardTo('/dashboard')
    }
  }
}

export function * logoutFlow () {
  while (true) {
    yield take(LOGOUT)
    yield put({type: SET_AUTH, newAuthState: false})
    yield call(logout)
    forwardTo('/')
  }
}

export function * fetchPlanets () {
  try {
    yield takeEvery(FETCH_PLANETS, searchPlanet)
  } catch (error) {
    yield put({type: REQUEST_ERROR, error: error.message})
  }
}

export default function * root () {
  yield [loginFlow(), logoutFlow(), fetchPlanets()]
}

function forwardTo (location) {
  browserHistory.push(location)
}
