import React, { PropTypes, Component } from 'react'
import Transition from 'react-motion-ui-pack'

export default class OutageList extends Component {
  render() {
    return(
      <div className="small-12 columns">
      <Transition
          component="dl"
          enter={{
            height: 'auto',
            opacity: 1,
          }}
          leave={{
            height: 0,
            opacity: 0,
          }}
        >
          {this.props.posts.map((post, i) =>
            <div key={i}>
            <dt>{post.title}</dt>
            <dd className="callout secondary">{post.description}</dd>
            </div>
          )}
      </Transition>
      </div>
    )
  }
};

OutageList.propTypes = {
  posts: PropTypes.array.isRequired
}
