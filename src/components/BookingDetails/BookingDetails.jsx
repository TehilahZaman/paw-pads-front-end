
import { useParams } from "react-router";
import { useState, useEffect } from "react";

import * as bookingService from '../../services/bookingService';

const BookingDetails = () => {

    const [booking, setBooking] = useState(null);

    useEffect(() => {
        const fetchBooking = async () => {
            const bookingData = await bookingService.show(bookingId);
            setBooking(bookingData);
        };
        fetchBooking();
    }, [bookingId]);

    const { bookingId } = useParams();

    console.log('bookingId', bookingId);
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
                </header>
            </section>
        </main >
    )
};

export default BookingDetails;