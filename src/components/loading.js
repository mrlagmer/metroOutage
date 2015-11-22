import React, { PropTypes, Component } from 'react'

export default class Loading extends Component {
  render() {
    return(
      <div className="spinner">
        <div className="cube1"></div>
        <div className="cube2"></div>
      </div>
    )
  }
}
