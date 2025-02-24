import { useParams, Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";

import * as bookingService from "../../services/bookingService";

const BookingDetails = (props) => {
  const [booking, setBooking] = useState(null);
  const { bookingId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingData = await bookingService.show(bookingId);
        setBooking(bookingData);
      } catch (err) {
        console.log(err.message, "<----error!");
      }
    };
    fetchBooking();
  }, [bookingId]);

    

  if (!booking) return <main>Loading...</main>;

  return (
    <main>
      <section>
        <header>
          <p>{booking.name.toUpperCase()}</p>
          <p>{`${booking.name} made a booking for`}</p>
          <p>Check-In Date: {booking.checkIn}</p>
          <p>Check-Out Date: {booking.checkOut}</p>
          {booking.message ? <p>{booking.message}</p> : null}
        </header>
        <button>
          {" "}
          <Link to={`/bookings/${bookingId}/edit`}>Edit Your Booking</Link>
        </button>
        <button onClick={() => props.handleDeleteBooking(bookingId)}>
          Delete Your Booking{" "}
        </button>
      </section>
    </main>
  );
};

export default BookingDetails;
