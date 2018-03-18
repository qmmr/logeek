import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav>
      <ul>
        <Link to="/">Home</Link>
        <Link to={{ pathname: '/about', search: 'id=search' }}>About</Link>
      </ul>
    </nav>
  )
}

export default Navigation
