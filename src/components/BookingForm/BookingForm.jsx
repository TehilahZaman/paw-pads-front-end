// practice making a form in react

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
      props.handleAddBooking(formData);
    }
  };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="checkIn">Check-in:</label>
                <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="checkOut">Check-out:</label>
                <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="message">Message:</label>
                <input
                    type="text"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                />
            </div>
            <div>
                <h1>{bookingId ? 'Edit Booking' : 'New Booking'}</h1>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default BookingForm;
