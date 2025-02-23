import { Link } from "react-router";
import { useState, useEffect } from "react";

import * as bookingService from '../../services/bookingService';

const BookingList = (props) => {
    
    const [bookings, setBookings] = useState([]);

    console.log(localStorage.getItem('token'));
    useEffect(() => {
        const fetchAllBookings = async () => {
          const bookingsData = await bookingService.index();
          console.log('bookingsData', bookingsData);
          setBookings(bookingsData);
        };
        fetchAllBookings();
      }, []);

    return (
        <main>
            {bookings.map((booking) => {
                <Link key={booking._id} to={`/bookings/${booking._id}`}>
                    <article>
                        <header>
                            <h2>Booking for...</h2>
                            <p>
                                {`${booking.name} made a booking on
                                ${new Date(booking.createdAt).toLocaleDateString()}`}
                            </p>
                        </header>
                    </article>
                </Link>
            })}
        </main>
    );
};


 export default BookingList;