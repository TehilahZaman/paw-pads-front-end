// practice making a form in react

import { useState } from "react";

const initialState = {
    name: '',
    checkIn: new Date(),
    checkOut: new Date(),
    message: ''
}

const BookingForm = () => {
    const [formData, setFormData] = useState(initialState)

    const handleChange = (buttonClicked) => {
        const { name, value } = buttonClicked.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (buttonClicked) => {
        buttonClicked.preventDefault(),
            console.log('Form Data Submitted', formData)
            setFormData(initialState) 
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
                <label htmlFor="check-in">Check-in:</label>
                <input
                    type="date"
                    id="check-in"
                    name="check-in"
                    value={formData.checkIn}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="check-out">Check-out:</label>
                <input
                    type="date"
                    id="check-out"
                    name="check-out"
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