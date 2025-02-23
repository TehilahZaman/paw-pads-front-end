// src/App.jsx

import { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./components/Landing/Landing";
import BookingForm from "./components/BookingForm/BookingForm";
import RentalDetails from "./components/RentalDetails/RentalDetails";
import RentalList from "./components/RentalList/RentalList";
import BookingList from './components/BookingList/BookingList';
import BookingDetails from "./components/BookingDetails/BookingDetails.jsx";

import * as bookingService from './services/bookingService';
import * as rentalService from "./services/rentalService.js";

import { UserContext } from "./contexts/UserContext";

// const testRentals = [
//   {
//     name: 'catnip hotel',
//     location: 'pico',
//     typeOfRental: 'hotel',
//     padOwner: '67aba47feb6008fdea4f04d3',
//     _id: '67b8a85f63b46892ce9c7f5b',
//     reviews: [],
//   },
//   {
//     name: 'Shack Hack',
//     location: 'pico',
//     typeOfRental: 'hotel',
//     padOwner: '67aba47feb6008fdea4f04d3',
//     _id: '67aba9c6e343e8985ea26fa8',
//     reviews: [],
//   },
// ]

const App = () => {
  const { user } = useContext(UserContext);

  const [rentals, setRentals] = useState([]);


  useEffect(() => {
    async function fetchRentals() {
      const data = await rentalService.index();
      setRentals(data);
    }
    fetchRentals();
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing /> } />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/users/book' element={<BookingForm />} />
        <Route path='/rentals' element={<RentalList rentals={rentals} />} />
        <Route path='/rentals/:rentalId' element={<RentalDetails />} />
        <Route path='/users/bookings' element={<BookingList />} />
        <Route path='/users/bookings/:bookingId' element={<BookingDetails />}/>
      </Routes> 
    </>
  );
};

export default App;

// This is Zak's comment
