import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { receivePosts, requestPosts, invalidateData, fetchPosts, filter } from '../state/outage'
import OutageList from '../components/outageList'
import Loading from '../components/loading'
import Search from '../components/search'

class Box extends Component {
  constructor(props) {
    super(props)
    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter(e) {
    const { dispatch } = this.props
    dispatch(filter(e.target.value))
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
        <Search handleFilter={this.handleFilter} />
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
    posts: state.posts.items,
    isFetching: state.posts.isFetching
  }
}

export default connect(mapStateToProps)(Box)
