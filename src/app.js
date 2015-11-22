require('./css/foundation.css')
require('./css/app.css')
import React from 'react'
import { render } from 'react-dom'
import Root from './holders/root.js';


render(
  <Root />,
  document.getElementById('root')
)
