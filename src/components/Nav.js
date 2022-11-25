import React from 'react'
import { Link } from 'react-router-dom'

const nav = () => {
  return (
    <nav>
        <ul>
            {/* React router recommands to use "Link to" but not use "a href". */}
            <li><Link to="/">Home</Link></li> 
            <li><Link to="/about">About</Link></li>
        </ul>
    </nav>
  )
}

export default nav