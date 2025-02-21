// src/App.jsx

import { useContext, useState } from 'react';
import { Routes, Route } from 'react-router'
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import BookingForm  from './components/BookingForm/BookingForm';
import RentalDetails from './components/RentalDetails/RentalDetails';
import RentalList from './components/RentalList/RentalList';



import ReviewForm from "./components/ReviewForm/ReviewForm";

const testRentals = [
  {
    name: "catnip hotel",
    location: "pico",
    typeOfRental: "hotel",
    padOwner: "67aba47feb6008fdea4f04d3",
    _id: "67b8a85f63b46892ce9c7f5b",
    reviews: [],
  },
  {
    name: "shack hack",
    location: "pico",
    typeOfRental: "hotel",
    padOwner: "67aba47feb6008fdea4f04d3",
    _id: "67aba9c6e343e8985ea26fa8",
    reviews: [],
  },
];

import { UserContext } from "./contexts/UserContext";
const App = () => {
  const [rentals, setRentals] = useState(testRentals);

  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/users/book" element={<BookingForm />} />
        <Route path="/rentals" element={<RentalList rentals={rentals} />} />
        <Route path="/rentals/:rentalId" element={<RentalDetail />} />
      </Routes>
    </>
  );
};

export default App;

// This is Zak's comment
