// src/App.jsx
import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router'
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import BookingForm  from './components/BookingForm/BookingForm';
import BookingIndex from './components/BookingIndex/BookingIndex'
// import BookingList from './components/BookingList/BookingLilst';
import RentalList from './components/RentalList/RentalList';
// import BookingList from './components/BookingList/BookingList'
import RentalDetail from './components/RentalDetail/RentalDetail';
import * as bookingService from './services/bookingService'

import { UserContext } from './contexts/UserContext';
const App = () => {
  
  const [rentals, setRentals] = useState([]);
  const [bookings, setBookings] = useState([]);
  
 
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(()=>{
    async function getAllBookings (){
      const allBookings = await bookingService.index();
      setBookings(allBookings)
    }
    getAllBookings()
  }, [])

  const handleAddBooking = async (formData) => {
    console.log('bookingFormData', formData);
    const newBooking = await bookingService.addBooking(formData)
    setBookings([...bookings, newBooking])
    navigate ('/bookings')
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing /> } />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/bookings/new' element={<BookingForm handleAddBooking={handleAddBooking} />} />
        <Route path='/bookings' element={<BookingIndex bookings={bookings}/>}/>
        <Route path='/rentals' element={<RentalList rentals={rentals}/>}/>
      </Routes> 
    </>
  );
};

export default App;

// This is Zak's comment 