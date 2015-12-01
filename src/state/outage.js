import fetch from 'isomorphic-fetch'
import { combineReducers } from 'redux'

export const FILTER = 'FILTER'
export const INVALIDATE_DATA = 'INVALIDATE_DATA'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function invalidateData() {
  return {
    type: INVALIDATE_DATA,
  }
}

export function filter(filter) {
  return {
    type: FILTER,
    filter
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

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestPosts())

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`http://localhost/metroOutage/src/api/testAPI.php`)
      .then(response => response.json())
      .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receivePosts(json))
      )

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}

function filterData(state =[],action) {
  switch (action.type) {
    case FILTER:
      return Object.assign({}, state, {
        filter: action.filter
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
