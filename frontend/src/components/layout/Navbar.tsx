import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="border-b-2 border-b-gray-700 flex items-center gap-6 h-14">
        <Link to={'/signup'}>Signup</Link>
        <Link to={'/login'}>Login</Link>
    </div>
  )
}

export default Navbar