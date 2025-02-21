// src/App.jsx
import { useContext, useState } from 'react';
import { Routes, Route } from 'react-router'
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import BookingForm  from './components/BookingForm/BookingForm';
import RentalList from './components/RentalList/RentalList';
import RentalDetail from './components/RentalDetail/RentalDetail';

import { UserContext } from "./contexts/UserContext";
const App = () => {
  
  const [rentals, setRentals] = useState([]);
 
  const { user } = useContext(UserContext)
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing /> } />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/users/book' element={<BookingForm />} />
        <Route path='/rentals' element={<RentalList rentals={rentals} />}/>
      </Routes> 
    </>
  );
};

export default App;

// This is Zak's comment
