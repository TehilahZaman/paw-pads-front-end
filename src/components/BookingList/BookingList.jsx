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

  return (
    <main>
      {!props.bookings.length ? <p>There are no bookings.</p> : null}
      {props.bookings.map((booking) => (
        <Link key={booking._id} to={`/bookings/${booking._id}`}>
          <article>
            <header>
              <h2>Booking for {booking.rental.name}</h2>
            </header>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default BookingList;
