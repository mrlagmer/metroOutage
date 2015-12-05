import fetch from 'isomorphic-fetch'
import { combineReducers } from 'redux'

export const FILTER_POSTS = 'FILTER_POSTS'
export const INVALIDATE_DATA = 'INVALIDATE_DATA'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
const PROD_URL = '../api/testAPI.php'
const TEST_URL = 'http://localhost/metroOutage/src/api/testAPI.php'

export function invalidateData() {
  return {
    type: INVALIDATE_DATA,
  }
}

export function filterList(filterData) {
  return {
    type: FILTER_POSTS,
    filterData
  }
}

export function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

export function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    posts: json.metro.map(child => child),
    receivedAt: Date.now()
  }
}

export function fetchPosts() {
    let url = PROD_URL
    if (document.location.hostname == 'localhost') {
        url = TEST_URL
    }
  return function (dispatch) {
    dispatch(requestPosts())
    return fetch(url)
      .then(response => response.json())
      .then(json =>
        dispatch(receivePosts(json))
      )
  }
}

function filterData(state =[],action) {
  switch (action.type) {
    case FILTER_POSTS:
      return Object.assign({}, state, {
        filterData: action.filterData
      })
    default:
      return state
  }
}

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case INVALIDATE_DATA:
    return Object.assign({}, state, {
      didInvalidate: true
    })
  case REQUEST_POSTS:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    })
  case RECEIVE_POSTS:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.posts,
      lastUpdated: action.receivedAt
    })
  default:
    return state
  }
}

const rootReducer = combineReducers({
  filterData,
  posts
})

export default rootReducer
