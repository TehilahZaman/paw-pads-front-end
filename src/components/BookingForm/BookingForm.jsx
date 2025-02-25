// practice making a form in react
import "../BookingForm/BookingForm.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

import * as bookingService from "../../services/bookingService.js";

const date = new Date();
const formattedDate = date.toLocaleDateString("en-US");
console.log(formattedDate);

const initialState = {
  name: "",
  checkIn: formattedDate,
  checkOut: formattedDate,
  message: "",
};

const BookingForm = (props) => {
  const [formData, setFormData] = useState(initialState);
  const { bookingId } = useParams();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const bookingData = await bookingService.show(bookingId);
      setFormData(bookingData);
      console.log(bookingData, "<----- Booking Data");
    };
    if (bookingId) fetchBookingDetails();
  }, [bookingId]);

  const handleChange = (buttonClicked) => {
    const { name, value } = buttonClicked.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault(), console.log("Form Data Submitted", formData);
    if (bookingId) {
      props.handleUpdateBooking(bookingId, formData);
    } else {
      props.handleAddBooking(formData, props.rentalId);
    }
  };

  function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return year + "-" + month + "-" + day;
  }

  return (
    <section>
      <h1>{bookingId ? "Edit Booking" : "New Booking"}</h1>
      <form onSubmit={handleSubmit} className="form">
        {/* <div>
        <label htmlFor="name">Name:</label>
        <input
        type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div> */}
        <div>
          <label htmlFor="checkIn">Check-in:</label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            value={getFormattedDate(new Date(formData.checkIn))}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="checkOut">Check-out:</label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            value={getFormattedDate(new Date(formData.checkOut))}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="message">Leave A Message For Your Host:</label>
          <input
            type="text"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <div></div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default BookingForm;
