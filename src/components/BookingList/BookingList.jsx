import "./BookingList.css";
import { Link } from "react-router";
import { useEffect } from "react";

import * as bookingService from "../../services/bookingService";

const BookingList = (props) => {
  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        console.log("the fetch function was called ");
        const bookingsData = await bookingService.index();
        console.log("bookingsData", bookingsData);
        props.setBookings(bookingsData);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchAllBookings();
  }, []);

  const style1 = { textDecoration: "none", color: "black" };
  return (
    <main>
      {!props.bookings.length ? (
        <p>There are no bookings.</p>
      ) : (
        <h1>Here are your bookings!</h1>
      )}
      {props.bookings.map((booking) => (
        <div key={booking._id}>
          <img
            src={`${booking.rental.photo}`}
            alt="photos of rentals"
            height="200"
            width="200"
          />
          <Link to={`/bookings/${booking._id}`} style={{ ...style1 }}>
            <header>
              <h2>Booking for {booking.rental.name}</h2>
            </header>
          </Link>
        </div>
      ))}
    </main>
  );
};

export default BookingList;
