import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { receivePosts, requestPosts, invalidateData, fetchPosts } from '../state/outage'
import OutageList from '../components/outageList'
import Loading from '../components/loading'

class Box extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPosts())
  }
  render() {
    const {  posts, isFetching, lastUpdated } = this.props
    return (
      <div className="commentBox row">
        <div className="callout large">
        <div className="row column text-center">
        <h1>Metro Trains Outage Info</h1>
        </div>
        </div>
        <hr />
        {isFetching &&
          <Loading />
        }
        {posts.length > 0 &&
          <OutageList posts={posts} />
        }
      </div>
    );
  }
};

Box.propTypes = {
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {


  return {
    posts: state.items,
    isFetching: state.isFetching
  }
}

export default connect(mapStateToProps)(Box)
