// in rental details page:

// <ReviewForm handleAddReview={handleAddReview}/>

import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as reviewService from "../../services/reviewService";

const initialState = { name: "", text: "" };

export default function ReviewForm(props) {
  const [formData, setFormData] = useState(initialState);

  const { rentalId, reviewId } = useParams();

  const [rental, setRental] = useState({
    name: "catnip hotel",
    location: "pico",
    typeOfRental: "hotel",
    padOwner: "67aba47feb6008fdea4f04d3",
    _id: "67b8a85f63b46892ce9c7f5b",
    reviews: [],
  });

  // =============================
  // booking id has to come from the details page, passed as prop
  //need to add rentalID!!
  // wil lthis run if i leave it here or does this functi0on need to be in details page? 
  const handleAddReview = async (reviewFormData) => {
    const newReview = await reviewService.createReview(
      rental._id,
      reviewFormData
    );
    setRental({ ...rental, reviews: [...rental.reviews, newReview] });
    console.log(newReview, "new review");
  };
  // ============================

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // if reviewId exists in params (url) then update review will run
    // else add review will run
    if (rentalId && reviewId) {
      reviewService.updateReview(rental._id, reviewId, formData);
    } else {
      // props.
      handleAddReview(formData);
    }
    setFormData(initialState);
  }

  return (
    <section>
      <h2>Leave a review!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="text">Review</label>
        <input
          type="text"
          name="text"
          id="text"
          value={formData.text}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
