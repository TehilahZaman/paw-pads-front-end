import { Link } from "react-router";
import { useState, useEffect } from "react";

import * as bookingService from "../../services/bookingService";

const BookingList = (props) => {
    // const [bookings, setBookings] = useState([]);

    //   console.log(localStorage.getItem("token"));
    // console.log(bookings);
    useEffect(() => {
        const fetchAllBookings = async () => {
            try {
            console.log("the fetch function was called ");
            const bookingsData = await bookingService.index();
            console.log("bookingsData", bookingsData);
            props.setBookings(bookingsData);
            } catch(err){
                console.log(err.message, '<----error!')
            }

        };
        fetchAllBookings();
    }, []);

    return (
        <main>
            {!props.bookings.length ? <p>There are no bookings.</p> : null}
            {/* added: if booking doesn't exist ... */}
            {props.bookings.map((booking) => (
                //  changed {} to ()
                <Link key={booking._id} to={`/bookings/${booking._id}`}>
                    <article>
                        <header>
                            <h2>Booking for...</h2>
                            <p>
                                {`${booking.name} made a booking on
                                ${new Date(
                                    booking.createdAt
                                ).toLocaleDateString()}`}
                            </p>
                        </header>
                    </article>
                </Link>
            ))}
        </main>
    );
};

export default BookingList;
