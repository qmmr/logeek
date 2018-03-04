import React from 'react'
import { Switch, Route } from 'react-router-dom'

import LogList from '../LogList'
import Login from '../Login'
import Signup from '../Signup'

export const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/login' component={ Login } />
        <Route exact path='/' component={ Login } />
        <Route exact path='/signup' component={ Signup } />
        <Route exact path='/logs' component={ LogList } />
      </Switch>
    </div>
  )
}

export default App
