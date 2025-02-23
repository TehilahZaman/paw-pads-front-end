import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as rentalService from "../../services/rentalService";
import * as reviewService from "../../services/reviewService";
import ReviewForm from "../ReviewForm/ReviewForm.jsx";
import { Link } from "react-router";

const RentalDetails = (props) => {
  const { rentalId } = useParams();

  const [rental, setRental] = useState(null);

  useEffect(() => {
    const fetchRental = async () => {
      const rentalData = await rentalService.show(rentalId);
      setRental(rentalData);
    };
    fetchRental();
  }, [rentalId]);

  // booking id has to come from the details page, passed as prop
  //need to add rentalID!!
  // wil lthis run if i leave it here or does this functi0on need to be in details page?
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
    setRental({ ...rental, reviews: [...rental.reviews, updatedReview] });
  };

  if (!rental) return;
  return (
    <main>
      <section>
        <header>
          <p></p>
          <h1>{rental.name}</h1>
        </header>
        <p>{rental.photo}</p>
        <p>{rental.location}</p>
        <p>{rental.typeOfRental}</p>
        <p>
          {rental.padOwner}
          ------- we need to change this !
        </p>
      </section>
      <section>
        <h2>Reviews:</h2>

        {!rental.reviews.length && <p>There are no reviews.</p>}

        {rental.reviews.map((review) => (
          <article key={review._id}>
            <p>
              {`${review.userName} post on
                             ${new Date(
                               review.createdAt
                             ).toLocaleDateString()}`}
            </p>
            <p>name: {review.name}</p>
            <p>{review.text}</p>
            {/* {reviewId ? <ReviewForm /> : null} */}

            <button>
              <Link to={`/rentals/${rental._id}/reviews/${review._id}/edit`}>
                {" "}
                Edit{" "}
              </Link>
            </button>
            <button onClick={() => handleDelete(review._id)}>Delete</button>
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
