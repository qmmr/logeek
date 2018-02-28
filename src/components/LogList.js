import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const LogList = ({ allUsersQuery }) => {
  return (
    <section>
      <header>Log list</header>
      {allUsersQuery.loading ? (
        <span>Loading...</span>
      ) : allUsersQuery.allUsers.length ? (
        allUsersQuery.allUsers.map(user => <div key={ user.id }>{user.name}</div>)
      ) : null}
    </section>
  )
}

const ALL_USERS_QUERY = gql`
  {
    allUsers {
      id
      name
      dateOfBirth
    }
  }
`

export default graphql(ALL_USERS_QUERY, { name: 'allUsersQuery' })(LogList)
