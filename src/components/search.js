import React, { PropTypes, Component } from 'react'

export default class Search extends Component {
  render() {
    return(
      <form>
      <div className="input-group">
        <input className="input-group-field" type="search" onKeyUp={this.props.handleFilter} />
        <a className="input-group-button button">Filter</a>
      </div>
      </form>
    )
  }
};
