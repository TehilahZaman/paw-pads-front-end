
import "./NavBar.css";
import { useContext } from "react";
import { Link } from "react-router";

import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  function handleSignOut() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <nav>
      {user ? (
        <ul className="nav">
          <li>
            <Link className="nav-link" to="/">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/rentals">
              Rental List
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/bookings">
              Your Bookings
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav">
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/sign-in">
              Sign In
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/sign-up">
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
