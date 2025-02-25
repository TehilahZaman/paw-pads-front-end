// src/components/Dashboard/Dashboard.jsx
import "./Dashboard/Dashboard.css";

// Leah is working here =====

import { useEffect, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import * as userService from "../../services/userService";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        console.log(fetchedUsers);
      } catch (err) {
        console.log(err);
      }
    };
    if (user) fetchUsers();
  }, [user.username]); // this useEffect is running when component loads, or when the value
  // of user changes

  return (
    <main>
      <h1>Welcome to Paw Pads, {user.username}</h1>
      <p>Find a purr-fect rental for your pet today!</p>
    </main>
  );
};

export default Dashboard;
