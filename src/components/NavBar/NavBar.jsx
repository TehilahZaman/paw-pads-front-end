// src/components/NavBar/NavBar.jsx
import { useContext } from "react";
import { Link } from "react-router";

import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
  // Pass the UserContext object to the useContext hook to access:
  // - The user state (which we use here).
  // - The setUser function to update the user state (which we aren't using).
  //
  // Destructure the object returned by the useContext hook for easy access
  // to the data we added to the context with familiar names.
  const { user, setUser } = useContext(UserContext);

  function handleSignOut() {
    // destroy the token!
    localStorage.removeItem("token");
    // clearing out our state
    setUser(null);
  }

  return (
    <nav>
      {user ? (
        <ul>
          <li>Welcome, {user.username}</li>
          {/* The new link */}

          <li><Link to='/'>Dashboard</Link></li>
          <li><Link to='/rentals'>Rental List</Link></li>
          <li><Link to='/bookings/new'>Book a Pad</Link></li>
          <li><Link to='/bookings'>Your Bookings</Link></li>
          {/* <li><Link to='/users/book'>Book</Link></li> */}
          <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
          {/* <li><Link to='/bookings'>Bookings</Link></li> */}

        </ul>
      ) : (
        <ul>
          {/* Another new link */}
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/sign-in'>Sign In</Link></li>
          <li><Link to='/sign-up'>Sign Up</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
