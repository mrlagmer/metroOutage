import React, { PropTypes, Component } from 'react'

export default class OutageList extends Component {
  render() {
    return(
      <div className="small-12 columns">
      <dl>
          {this.props.posts.map((post, i) =>
            <div key={i}>
            <dt>{post.title}</dt>
            <dd className="callout secondary">{post.description}</dd>
            </div>
          )}
      </dl>
      </div>
    )
  }
};

OutageList.propTypes = {
  posts: PropTypes.array.isRequired
}
