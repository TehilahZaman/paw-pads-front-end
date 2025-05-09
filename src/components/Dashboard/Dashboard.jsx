
import "./Dashboard.css";

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
  }, [user.username]);

  return (
    <main className="dashboard">
      <h1>Welcome to Paw Pads, {user.username}</h1>
      <h2>Find a purr-fect rental for you and your pet today!</h2>
    </main>
  );
};

export default Dashboard;
