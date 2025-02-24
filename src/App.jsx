// src/App.jsx

import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./components/Landing/Landing";
import BookingForm from "./components/BookingForm/BookingForm";
import BookingList from "./components/BookingList/BookingList";
import RentalDetails from "./components/RentalDetails/RentalDetails";
import RentalList from "./components/RentalList/RentalList";
import * as rentalService from "./services/rentalService.js";
import * as bookingService from "./services/bookingService";

import { UserContext } from "./contexts/UserContext";

const App = () => {
  const [rentals, setRentals] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchRentals() {
      const data = await rentalService.index();
      setRentals(data);
    }
    fetchRentals();
  }, []);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleAddBooking = async (formData) => {
    console.log("bookingFormData", formData);
    const newBooking = await bookingService.addBooking(formData);
    setBookings([...bookings, newBooking])
    navigate("/bookings");
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route
          path="/bookings/new"
          element={<BookingForm handleAddBooking={handleAddBooking} />}
        />
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/rentals" element={<RentalList rentals={rentals} />} />
        <Route
          path="/rentals/:rentalId"
          element={<RentalDetails rentals={rentals} setRentals={setRentals} />}
        />
        <Route
          path="/rentals/:rentalId/reviews/:reviewId/edit"
          element={<RentalDetails />}
        />
      </Routes>
    </>
  );
};

export default App;
