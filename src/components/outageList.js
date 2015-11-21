import React, { PropTypes, Component } from 'react'

export default class OutageList extends Component {
  render() {
    return(
      <ul>
          {this.props.posts.map((post, i) =>
            <li key={i}>{post.title}</li>
          )}
      </ul>
    )
  }
};

OutageList.propTypes = {
  posts: PropTypes.array.isRequired
}
