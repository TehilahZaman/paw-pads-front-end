import "./RentalDetails.css";
import { useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import * as rentalService from "../../services/rentalService";
import * as reviewService from "../../services/reviewService";
import ReviewForm from "../ReviewForm/ReviewForm.jsx";
import { Link } from "react-router";
import BookingForm from "../BookingForm/BookingForm.jsx";
import { UserContext } from "../../contexts/UserContext";

const RentalDetails = (props) => {
  const { user } = useContext(UserContext);
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

  const style1 = { textDecoration: "none", color: "black" };
  if (!rental) return;
  return (
    <main>
      <section className="rental-section">
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
          A wonderful {rental.typeOfRental} located in {rental.location}
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
      <section className="review-section">
        <h2>Reviews:</h2>

        <section className="rev-sec">
          {!rental.reviews.length && <p>There are no reviews.</p>}
          <section className="review-list">
            {rental.reviews.map((review) => (
              <article key={review._id} className="review">
                <p className="review-username">{review.userName} posted</p>
                <p className="review-text">{review.text}</p>

                {user._id === review.author ? (
                  <div className="button-div">
                    <button className="edit-button">
                      <Link
                        style={{ ...style1 }}
                        to={`/rentals/${rental._id}/reviews/${review._id}/edit`}
                      >
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
                  </div>
                ) : null}
              </article>
            ))}
          </section>
          <article>
            <ReviewForm
              handleAddReview={handleAddReview}
              handleUpdate={handleUpdate}
            />
          </article>
        </section>
      </section>
    </main>
  );
};

export default RentalDetails;
