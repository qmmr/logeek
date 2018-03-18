// @flow
/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { Form, Text } from 'react-form'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'

const AUTH_TOKEN = 'auth-token'

const Login = props => {
  const saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  const loginUser = async ({ authenticateUser, email, password, history }) => {
    const result = await authenticateUser({
      variables: { email, password },
    })
    const { token } = result.data.authenticateUser

    if (token) {
      saveUserData(token)
      // Navigate to home page after mutation returns the token
      history.push('/welcome')
    }
  }

  const handleSubmit = ({ email, password }, event, formApi) => {
    // console.log('handleSubmit', event, formApi)
    loginUser({
      authenticateUser: props.authenticateUser,
      email,
      password,
      history: props.history,
    })
  }
  const { from } = (props.location && props.location.state) || { from: { pathname: '/' } }

  if (localStorage.getItem(AUTH_TOKEN) !== '') {
    return (
      <Redirect
        to={{
          pathname: '/logs',
          state: { from: props.location },
        }}
      />
    )
  }

  return (
    <section>
      <p>You need to login to access "{from.pathname}"</p>
      <Form onSubmit={handleSubmit}>
        {formApi => {
          return (
            <form onSubmit={formApi.submitForm}>
              <label htmlFor="email">email</label>
              <Text field="email" id="email" />
              <label htmlFor="password">password</label>
              <Text field="password" type="password" id="password" />
              <button type="submit" className="mb-4 btn btn-primary">
                Submit
              </button>
            </form>
          )
        }}
      </Form>
    </section>
  )
}

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      id
      token
    }
  }
`

export default graphql(AUTHENTICATE_USER_MUTATION, { name: 'authenticateUser' })(Login)
