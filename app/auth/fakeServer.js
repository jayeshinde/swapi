import {hashSync, genSaltSync, compareSync} from 'bcryptjs'
import genSalt from './salt'

let users
let localStorage
const salt = genSaltSync(10)

if (global.process && process.env.NODE_ENV === 'test') {
  localStorage = require('localStorage')
} else {
  localStorage = global.window.localStorage
}

const server = {
  init () {
    if (localStorage.users === undefined || !localStorage.encrypted) {
      const usrLuke = 'Luke Skywalker'
      const usrLukeSalt = genSalt(usrLuke)
      const usrLukePass = hashSync('19BBY', usrLukeSalt)

      users = {
        [usrLuke]: hashSync(usrLukePass, salt)
      }
      localStorage.users = JSON.stringify(users)
      localStorage.encrypted = true
    } else {
      users = JSON.parse(localStorage.users)
    }
  },
  login (username, password) {
    const userExists = this.doesUserExist(username)
    return new Promise((resolve, reject) => {
      if (userExists && compareSync(password, users[username])) {
        resolve({
          authenticated: true,
          token: Math.random().toString(36).substring(7)
        })
      } else {
        let error
        if (userExists) {
          error = new Error('Wrong password')
        } else {
          error = new Error('User doesn\'t exist')
        }
        reject(error)
      }
    })
  },

  logout () {
    return new Promise(resolve => {
      localStorage.removeItem('token')
      resolve(true)
    })
  },

  doesUserExist (username) {
    return !(users[username] === undefined)
  }
}

server.init()

export default server
