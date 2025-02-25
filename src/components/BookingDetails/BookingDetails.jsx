import "./BookingDetails.css";
import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";

import * as bookingService from "../../services/bookingService";

const BookingDetails = (props) => {
  const [booking, setBooking] = useState(null);
  const { bookingId } = useParams();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingData = await bookingService.show(bookingId);
        setBooking(bookingData);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchBooking();
  }, [bookingId]);

  function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }

  if (!booking) return <main>Loading...</main>;
  return (
    <main>
      <section>
        <header>
          <img src={`${booking.rental.photo}`} alt="photos of rentals" height="300" width="300" />
          {/* <p>Name: {booking.name.toUpperCase()}</p> */}
          <img src={`${booking.rental.photo}`} height="300" width="300" />
          <h1>Rental for {booking.rental.name} </h1>
          <p>Check-in: {getFormattedDate(new Date(booking.checkIn))}</p>
          <p>Check-out: {getFormattedDate(new Date(booking.checkOut))}</p>
          <p>Rental Informtion: </p>
          <p>Host {booking.rental.padOwner}</p>
          <p>
            {" "}
            {booking.rental.typeOfRental} located in {booking.rental.location}
          </p>
          {booking.message ? <p> Message for host: {booking.message}</p> : null}
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
