import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../state/configureStore'
import Box from './box'

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Box />
      </Provider>
    )
  }
}
