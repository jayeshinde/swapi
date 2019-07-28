import React, {Component} from 'react'
import {connect} from 'react-redux'

class Home extends Component {
  render () {
    return (
      <article>
        <div>
          <section className='text-section'>
            <h1>Welcome to Star War</h1>            
            <h2> Objective </h2>
            <li> Clean and organised code </li>
            <li>Adherence to prevalent guidelines and patterns specific to platform and tools chosen Ability to understand and use third-party APIs/ components</li>
            <li>Separation of concerns</li>
            <li>Ease of use of UI</li>
            <li>Ease of unit testing (add unit tests if possible)</li>
          </section>
          <section className='text-section'>
            <h2>Problem Statement</h2>
            <p>
            Create a JavaScript application using any popular MV* framework or react-flux architecture that has two pages as described below using API from the website 
              <code>http:// swapi.co</code>
            Please go through the documentation and API response carefully to chose the right set of APIs and call them with the proper arguments.
            The application is supposed to have 2 pages:
            <br></br>
            Page 1 (Login Page)
            Allow the user to login as a character from STAR WARS using the character name as the username and birth year as the password.
            eg:
            Username: Luke Skywalker
            Password : 19BBY
            <br></br>
            Page 2 (Search Page)
            Implement a type-along search which searches for planets and lists them in components (eg: div) that are sized relative to their population on every keypress in the input field. (eg: you can use a bigger font size for a planet with larger population, or even show a bigger div for a planet with larger population)
            <br></br>
            Advanced:: Only the user Luke Skywalker should be able to make more than 15 searches in a minute.
            </p>
          </section>
        </div>
      </article>
    )
  }
}

function select (state) {
  return {
    data: state
  }
}

export default connect(select)(Home)
