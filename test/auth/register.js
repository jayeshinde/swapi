import test from 'ava'
import auth from '../../app/auth'

test('registers when given good data', t => {
  return auth.register('Luke Skywalker', '19BBY')
    .then(response => {
      t.true(response)
      t.true(auth.loggedIn())
    })
})

test('returns error when given existing user', t => {
  return t.throws(auth.register('Luke Skywalker', '19BBY', 'Username already in use'))
})
