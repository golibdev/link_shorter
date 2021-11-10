import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
   const auth = useContext(AuthContext)

   const logoutHandler = event => {
      event.preventDefault()
      auth.logout()
   }
   return (
      <nav>
         <div className="nav-wrapper blue darken-1" style = {{ padding: '0 2rem' }}>
            <a href="/" className="brand-logo">Abbreviated link</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to="/create">Create</NavLink></li>
            <li><NavLink to="/links">Links</NavLink></li>
            <li><a href="/" onClick={logoutHandler} >Logout</a></li>
            </ul>
         </div>
      </nav>
   )
}