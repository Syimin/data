import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import App from './jsx/App'


var renderMethod
if (root && root.innerHTML !== "") {
  renderMethod = "hydrate"
} else {
  renderMethod = "render"
}


const root = document.querySelector('#root')//定位到root标签
ReactDOM[renderMethod](<BrowserRouter><App/></BrowserRouter>,root)