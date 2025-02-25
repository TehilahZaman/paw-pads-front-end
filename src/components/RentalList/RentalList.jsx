import "./RentalList.css";

import { Link } from "react-router";
const style1 = {textDecoration: "underline", color: "black"}
export default function RentalList(props) {
  const rentalLis = props.rentals.map((rental) => (
    <li key={rental._id} className="rental">
      <img className="rental-photo" src={`${rental.photo}`} alt="photos of rentals properties."/>
      <Link style={{...style1}}to={`/rentals/${rental._id}`}>{rental.name}</Link>
    </li>
  ));

  return (
    <section className="rental-list">
      <h1>Rental List</h1>
      {rentalLis.length !== 0 ? <ul>{rentalLis}</ul> : <h2>No rentals yet!</h2>}
    </section>
  );
}
