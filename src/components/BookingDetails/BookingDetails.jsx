import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";

import { UserContext } from '../../contexts/UserContext';

import * as bookingService from "../../services/bookingService";

const BookingDetails = (props) => {
    const { bookingId } = useParams();
    const { user } = useContext(UserContext);

    const [booking, setBooking] = useState(null);

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

  console.log("booking", booking);
  if (!booking) return <main>Loading...</main>;

  return (
    <main>
      <section>
        <header>
          <p>{booking.name.toUpperCase()}</p>
          <h1>{booking.checkIn}</h1>
          <h1>{booking.checkOut}</h1>
          <p>
            {`${booking.name} made a booking on
                        ${new Date(booking.createdAt).toLocaleDateString()}`}
          </p>
          <p>Date:{booking.checkIn}</p>
          <p>Date:{booking.checkOut}</p>
          {booking.message ? <p>{booking.message}</p> : null}
          <Link to={`/bookings/${bookingId}/edit`}>Edit</Link>
          {booking.name._id === user._id && (
            <>
                <button onClick={() => props.handleDeleteBooking(bookingId)}>Delete</button>
            </>
          )}
        </header>
      </section>
    </main>
  );
};

export default BookingDetails;
