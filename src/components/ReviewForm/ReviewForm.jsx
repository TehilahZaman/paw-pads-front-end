// in rental details page:

// <ReviewForm handleAddReview={handleAddReview}/>

import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as reviewService from "../../services/reviewService";

const initialState = { name: "", text: "" };

export default function ReviewForm(props) {
  const [formData, setFormData] = useState(initialState);
  const { rentalId, reviewId } = useParams();
  console.log(rentalId, reviewId, "<---- log");

  useEffect(() => {
    const fetchReview = async () => {
      const reviewData = await reviewService.showReview(rentalId, reviewId);
      console.log(reviewData, "<----- review data");
      setFormData(reviewData);
    };
    if (rentalId && reviewId) fetchReview();
  }, [rentalId, reviewId]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // if reviewId exists in params (url) then update review will run
    // else add review will run
    if (rentalId && reviewId) {
      reviewService.updateReview(rentalId, reviewId, formData);
    } else {
      props.handleAddReview(formData, rentalId);
    }
    setFormData(initialState);
  }

  return (
    <section>
      <h2>Leave a review!</h2>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        /> */}
        <label htmlFor="text">Review</label>
        <input
          type="text"
          name="text"
          id="text"
          value={formData.text}
          onChange={handleChange}
        />
        <button type="submit">{reviewId ? "Update" : "Create"}</button>
      </form>
    </section>
  );
}
