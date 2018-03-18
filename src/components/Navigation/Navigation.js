import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const token = localStorage.getItem('auth-token')

  return (
    <heading>
      <h2>Auth status: {token ? 'logged in' : 'not logged in'}</h2>
      <nav>
        <ul>
          <Link to="/">Home</Link>
          {!token ? <Link to="/login">Login</Link> : <Link to="/logout">Logout</Link>}
          {!token ? <Link to="/signup">Signup</Link> : null}
          <Link to={{ pathname: '/about', search: 'id=search' }}>About</Link>
        </ul>
      </nav>
    </heading>
  )
}

export default Navigation
