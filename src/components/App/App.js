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
  const styles = {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
  }

  return (
    <div style={styles}>
      <Navigation />

      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <article>
                <h1>Hi! Welcome to</h1>
                <pre>
                  <code style={{ fontSize: '4rem' }}>
                    LOG<br />
                    EEK
                  </code>
                </pre>
              </article>
            )
          }}
        />
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
