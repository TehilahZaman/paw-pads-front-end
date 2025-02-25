// src/App.jsx

import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./components/Landing/Landing";
import BookingDetails from "./components/BookingDetails/BookingDetails.jsx";
import BookingForm from "./components/BookingForm/BookingForm";
import BookingList from "./components/BookingList/BookingList";
import RentalDetails from "./components/RentalDetails/RentalDetails";
import RentalList from "./components/RentalList/RentalList";

import * as bookingService from "./services/bookingService";
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

  const handleAddBooking = async (formData, rentalId) => {
    console.log("bookingFormData", formData);
    const newBooking = await bookingService.addBooking(formData, rentalId);
    setBookings([...bookings, newBooking]);
    navigate("/bookings");
  };

  async function handleUpdateBooking(bookingId, formData) {
    try {
      const updatedBooking = await bookingService.updateBooking(
        bookingId,
        formData
      );
      setBookings((booking) =>
        bookingId === booking._id ? updatedBooking : booking
      );
      navigate(`/bookings/${bookingId}`);
      // here was the extra }
    } catch (err) {
      console.log(err.message, "<----error!");
    }
  }

  async function handleDeleteBooking(bookingId) {
    try {
      await bookingService.deleteBooking(bookingId);
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
      navigate("/bookings");
    } catch (err) {
      console.log(err.message, "<----error!");
    }
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route
          path="/bookings/new"
          element={
            <BookingForm
              handleAddBooking={handleAddBooking}
              handleUpdateBooking={handleUpdateBooking}
            />
          }
        />

        <Route
          path="/bookings"
          element={
            <BookingList bookings={bookings} setBookings={setBookings} />
          }
        />
        <Route path="/rentals" element={<RentalList rentals={rentals} />} />
        <Route
          path="/rentals/:rentalId"
          element={<RentalDetails rentals={rentals} setRentals={setRentals} handleAddBooking={handleAddBooking} />}
        />
        <Route
          path="/rentals/:rentalId/reviews/:reviewId/edit"
          element={<RentalDetails />}
        />
        <Route
          path="/bookings/:bookingId"
          element={<BookingDetails handleDeleteBooking={handleDeleteBooking} />}
        />
        <Route
          path="/bookings/:bookingId/edit"
          element={<BookingForm handleUpdateBooking={handleUpdateBooking} />}
        />
      </Routes>
    </>
  );
};

export default App;
