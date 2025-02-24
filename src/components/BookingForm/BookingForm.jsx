// practice making a form in react

import { useState } from "react";
const date = new Date();
const formattedDate = date.toLocaleDateString('en-US');
console.log(formattedDate);


const initialState = {
    name: '',
    checkIn: formattedDate,
    checkOut: formattedDate,
    message: ''
}

const BookingForm = (props) => {
    const [formData, setFormData] = useState(initialState)

    const handleChange = (buttonClicked) => {
        const { name, value } = buttonClicked.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault(),
            console.log('Form Data Submitted', formData)
        props.handleAddBooking(formData)

    }

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
            <button type="submit">Submit</button>
        </form>
    )
}

export default BookingForm