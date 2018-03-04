import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const LogList = ({ allLogsQuery }) => {
  return (
    <section>
      <header>Log list</header>
      {allLogsQuery.loading ? (
        <span>Looking for logs...</span>
      ) : allLogsQuery.allLogs.length ? (
        allLogsQuery.allLogs.map(log => (
          <div key={ log.id }>
            {log.distance} - {log.estimatedDistance}
          </div>
        ))
      ) : (
        <span>Sorry, no logs found 😭</span>
      )}
    </section>
  )
}

const ALL_LOGS_QUERY = gql`
  {
    allLogs {
      id
      distance
      estimatedDistance
    }
  }
`

export default graphql(ALL_LOGS_QUERY, { name: 'allLogsQuery' })(LogList)
