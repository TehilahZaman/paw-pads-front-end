import { useParams } from "react-router";
import { useState, useEffect } from "react";

import * as bookingService from "../../services/bookingService";

const BookingDetails = () => {
  const [booking, setBooking] = useState(null);
  const { bookingId } = useParams();

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

  console.log("bookingId", bookingId);

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
          <p>Name: {booking.name.toUpperCase()}</p>
          <h1>Check-in: {getFormattedDate(new Date(booking.checkIn))}</h1>
          <h1>Check-out: {getFormattedDate(new Date(booking.checkOut))}</h1>
          Message: {booking.message ? <p>{booking.message}</p> : null}
        </header>
      </section>
    </main>
  );
};

export default BookingDetails;
