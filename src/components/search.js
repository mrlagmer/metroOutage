import React, { PropTypes, Component } from 'react'

export default class Search extends Component {
  render() {
    return(
      <form>
      <div className="input-group">
        <input className="input-group-field" type="search" placeholder="Filter List..." onKeyUp={this.props.handleFilter} />
      </div>
      </form>
    )
  }
};
