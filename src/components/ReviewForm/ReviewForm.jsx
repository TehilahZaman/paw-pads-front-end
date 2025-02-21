// in rental details page:

// <ReviewForm handleAddReview={handleAddReview}/>

import * as reviewService from "../../services/reviewService";

import { useState } from "react";

const initialState = { name: "", text: "" };

export default function ReviewForm(props) {
  const [formData, setFormData] = useState(initialState);
  const [rental, setRental] = useState({
    name: "catnip hotel",
    location: "pico",
    typeOfRental: "hotel",
    padOwner: "67aba47feb6008fdea4f04d3",
    _id: "67b8a85f63b46892ce9c7f5b",
    reviews: [],
  });

  // booking id has to come from the details page, passed as prop
  //need to add rentalID!!
  const handleAddReview = async (reviewFormData) => {
    const newReview = await reviewService.createReview(
      rental._id,
      reviewFormData
    );
    setRental({ ...rental, reviews: [...rental.reviews, newReview] });
    console.log(newReview, "new review");
    console.log(rental);
  };

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // props.
    handleAddReview(formData);
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
