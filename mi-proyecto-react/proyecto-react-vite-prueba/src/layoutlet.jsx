// import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function layoutlet() {
  return (
    <main>
        <nav>
            <Link to="/">Inicio | </Link>
            <Link to="/Centro">Centro | </Link>
            <Link to="/Daw2"> 2º DAW </Link>
        </nav>
        <div>
            <Outlet/>
        </div>
    </main>
  )
}
