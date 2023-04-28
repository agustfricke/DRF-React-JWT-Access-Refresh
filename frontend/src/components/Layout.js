import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Layout = () => {

    let { logoutUser } = useContext(AuthContext)

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <button onClick={logoutUser}>logout</button>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
