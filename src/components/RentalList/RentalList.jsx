import "./RentalList.css";

import { Link } from "react-router";

export default function RentalList(props) {
  const rentalLis = props.rentals.map((rental) => (
    <li key={rental._id} className="rental">
      <Link to={`/rentals/${rental._id}`}>{rental.name}</Link>
      <img className="rental-photo" src={`${rental.photo}`} alt="photos of rentals properties."/>
    </li>
  ));

  return (
    <section className="rental-list">
      <h1>Rental List</h1>
      {rentalLis.length !== 0 ? <ul>{rentalLis}</ul> : <h2>No rentals yet!</h2>}
    </section>
  );
}
