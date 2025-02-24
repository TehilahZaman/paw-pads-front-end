import { Link } from "react-router";
import { useEffect } from "react";

import * as bookingService from "../../services/bookingService";

const BookingList = (props) => {
    // const [bookings, setBookings] = useState([]);

    //   console.log(localStorage.getItem("token"));
    // console.log(bookings);
    useEffect(() => {
        const fetchAllBookings = async (props) => {
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
                                      <h2>Booking for {booking.name}</h2>
                        </header>
                    </article>
                </Link>
            ))}
        </main>
    );
};

export default BookingList;
