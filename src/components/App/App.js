import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Navigation from '../Navigation'
import LogList from '../LogList'
import Login from '../Login'
import Signup from '../Signup'

/* eslint-disable react/jsx-no-bind, react/no-multi-comp */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const token = localStorage.getItem('auth-token')

      return token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }}
  />
)

export const App = () => {
  const token = localStorage.getItem('auth-token')

  return (
    <div>
      <Navigation />
      <header>Auth status: {token ? 'logged in' : 'not logged in'}</header>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/logs" component={LogList} />
        <Route render={() => <h1>Page not foun, sorry :(</h1>} />
      </Switch>
    </div>
  )
}

export default App
