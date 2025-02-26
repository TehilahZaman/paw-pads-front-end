
import "./ReviewForm.css";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import * as reviewService from "../../services/reviewService";

const initialState = { name: "", text: "" };

export default function ReviewForm(props) {
  const [formData, setFormData] = useState(initialState);
  const { rentalId, reviewId } = useParams();
  console.log(rentalId, reviewId, "<---- log");
  const navigate = useNavigate();

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

    if (rentalId && reviewId) {
      props.handleUpdate(rentalId, reviewId, formData);

      navigate(`/rentals/${rentalId}`);
    } else {
      props.handleAddReview(formData, rentalId);
    }
    setFormData(initialState);
  }

  return (
    <section>
     
      <form onSubmit={handleSubmit} className="review-form">
        <label> {reviewId ? "Update your Review!" : "Leave a review!"}</label>

        <div> 
          <label htmlFor="text">Review: {" "}</label>
        <input
          type="text"
          name="text"
          id="text"
          value={formData.text}
          onChange={handleChange}
          />
          </div>
        <button type="submit">{reviewId ? "Update" : "Create"}</button>
      </form>
    </section>
  );
}
