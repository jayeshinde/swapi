import test from 'ava'
import auth from '../../app/auth'

import {hashSync} from 'bcryptjs'
import genSalt from '../../app/auth/salt'

test('returns true on correct login', t => {
  const salt = genSalt('usrLuke')
  const hash = hashSync('19BBY', salt)

  return auth.login('usrLuke', hash)
    .then(response => {
      t.true(response)
    })
})

test('returns error on wrong password', t => {
  return t.throws(auth.login('usrLuke', 'wrong'), 'Wrong password')
})

test('returns error on inexistent user', t => {
  return t.throws(auth.login('banana', 'wrong'), 'User doesn\'t exist')
})

test('stays logged in until log out', t => {
  const salt = genSalt('usrLuke')
  const hash = hashSync('password', salt)

  return auth.login('usrLuke', hash)
    .then(() => {
      t.true(auth.loggedIn())
      auth.logout(() => {
        t.false(auth.loggedIn())
      })
    })
})
