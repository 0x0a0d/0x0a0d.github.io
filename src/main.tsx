import React from 'react'
import ReactDOM from 'react-dom'

import './index.scss'
import 'virtual:windi.css'

import { App } from './App'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { ATCommand } from './ATCommand/ATCommand'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Switch>
        <Route path={'/at-command'}>
          <ATCommand />
        </Route>
        <Route path={'/'}>
          <App />
        </Route>
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
