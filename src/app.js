import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import posts from './state/outage.js';
import {fetchPosts} from './state/outage.js';
import Box from './holders/box.js';

const loggerMiddleware = createLogger()

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)(createStore)

const store = createStoreWithMiddleware(posts)

store.dispatch(fetchPosts()).then(() =>
  console.log(store.getState())
)

ReactDOM.render(
  <Box />,
  document.getElementById('root')
);
