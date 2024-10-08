import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "../styles/Navbar.css"

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
      Home
      </Link>
      <ul>
        <CustomLink to="/">Account</CustomLink>
        <CustomLink to="/logout">Logout</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}