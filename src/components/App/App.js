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
      <Switch>
        <Route exact path="/" component={Login} />
        <Route
          exact
          path="/login"
          render={props => {
            return token ? <Redirect to={{ pathname: '/welcome' }} /> : <Login {...props} />
          }}
        />
        <Route
          exact
          path="/logout"
          render={props => {
            console.log('props, token', props, token)
            if (token) {
              localStorage.setItem('auth-token', '')
              return <Redirect to={{ pathname: '/logged-out' }} />
            }
            return <Redirect to={{ pathname: '/' }} />
          }}
        />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/logs" component={LogList} />
        <Route
          path="/logged-out"
          render={({ match, location }) => {
            console.log('match', match)
            console.log('location', location)
            return <p>You have been successfully logged out! BYE!</p>
          }}
        />
        <Route
          path="/welcome"
          render={() => {
            return <h1>Welcome back!</h1>
          }}
        />
        <Route render={() => <h1>Page not foun, sorry :(</h1>} />
      </Switch>
    </div>
  )
}

export default App
