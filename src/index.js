import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import registerServiceWorker from './registerServiceWorker'

import App from './App'
import './index.css'

require('dotenv').config()

const httpLink = new HttpLink({ uri: process.env.REACT_APP_SIMPLE_ENDPOINT })
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={ client }>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
