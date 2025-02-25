import "./RentalDetails.css";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as rentalService from "../../services/rentalService";
import * as reviewService from "../../services/reviewService";
import ReviewForm from "../ReviewForm/ReviewForm.jsx";
import { Link } from "react-router";
import BookingForm from "../BookingForm/BookingForm.jsx";

const RentalDetails = (props) => {
  const { rentalId } = useParams();

  const [rental, setRental] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchRental = async () => {
      const rentalData = await rentalService.show(rentalId);
      setRental(rentalData);
    };
    fetchRental();
  }, [rentalId]);

  const handleAddReview = async (reviewFormData, rentalId) => {
    const newReview = await reviewService.createReview(
      rentalId,
      reviewFormData
    );
    setRental({ ...rental, reviews: [...rental.reviews, newReview] });
  };

  const handleDelete = async (reviewId) => {
    await reviewService.deleteReview(rental._id, reviewId);
    setRental({
      ...rental,
      reviews: rental.reviews.filter((review) => review._id !== reviewId),
    });
    props.setRentals([...props.rentals, rental]);
  };

  const handleUpdate = async (rentalId, reviewId, formData) => {
    const updatedReview = await reviewService.updateReview(
      rentalId,
      reviewId,
      formData
    );
    setRental({
      ...rental,
      reviews: rental.reviews.map((review) =>
        review._id === reviewId ? updatedReview : review
      ),
    });
  };

  if (!rental) return;
  return (
    <main>
      <section>
        <header>
          <h1>{rental.name}</h1>
        </header>
        <img
          src={`${rental.photo}`}
          alt="photos of rentals"
          height="300"
          width="300"
        />
        <p>
          A wonderful {rental.typeOfRental} located at {rental.location}
        </p>
        {/* <p>{rental.typeOfRental}</p> */}
        <p>Rental owner {rental.padOwner}</p>
        <button onClick={() => setShowForm(true)}>Book Your Stay Here!</button>
        {showForm && (
          <BookingForm
            handleAddBooking={props.handleAddBooking}
            rentalId={rental._id}
          />
        )}{" "}
      </section>
      <section>
        <h2>Reviews:</h2>

        {!rental.reviews.length && <p>There are no reviews.</p>}
        {rental.reviews.map((review) => (
          <article key={review._id} className="review">
            <p className="review-header">{review.userName} posted</p>
            <p>{review.text}</p>
            <button className="edit-button">
              <Link to={`/rentals/${rental._id}/reviews/${review._id}/edit`}>
                {" "}
                Edit{" "}
              </Link>
            </button>
            <button
              className="delete-button"
              onClick={() => handleDelete(review._id)}
            >
              Delete
            </button>
          </article>
        ))}
        <ReviewForm
          handleAddReview={handleAddReview}
          handleUpdate={handleUpdate}
        />
      </section>
    </main>
  );
};

export default RentalDetails;
