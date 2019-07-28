import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPlanets} from '../actions'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this._handleChange = this._handleChange.bind(this)
  }

  render () {
    return (
      <div className='full-width'>
        <form>
          <input type='text' className='full-width' placeholder='Search Planets' onChange={this._handleChange} />
        </form>
        <div> {
          this.props.data.planets.map(p => <div className='card' key={p.name}> <div className='container'>
          <div style={{fontSize: `${p.size}`}}><h4><b>{p.name}</b></h4></div><p>{p.population}</p> </div></div>)} </div>
      </div>
    )
  }

  _handleChange (event) {
    const searchword = event.target.value
    this.props.dispatch(fetchPlanets({searchword}))
  }
}

Dashboard.propTypes = {
  data: React.PropTypes.object,
  history: React.PropTypes.object,
  dispatch: React.PropTypes.func
}

function select (state) {
  return {
    data: state
  }
}

export default connect(select)(Dashboard)
