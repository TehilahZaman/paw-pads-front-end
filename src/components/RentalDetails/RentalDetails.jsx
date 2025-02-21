import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as rentalService from "../../services/rentalService";
import * as reviewService from "../../services/reviewService";
import ReviewForm from "../ReviewForm/ReviewForm.jsx";

const RentalDetails = () => {
  const { rentalId } = useParams();
  console.log("rentalId", rentalId);

  const [rental, setRental] = useState(null);

  useEffect(() => {
    console.log("running");
    const fetchRental = async () => {
      const rentalData = await rentalService.show(rentalId);
      console.log(rentalData, "<---- data");
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
    console.log(newReview, "new review");
  };

  console.log("rental date:", rental);
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
            <p>{review.text}</p>
          </article>
        ))}
        <ReviewForm handleAddReview={handleAddReview} />
      </section>
    </main>
  );
};

export default RentalDetails;

// export default function RentalDetail(props){
//     if(props.selectedRental === null){
//         return (
//             <section>
//                 <h2>No Rental Selected</h2>
//             </section>
//         )
//     }

// return (
//     <section>
//         <h2>{props.selectedRental.name}</h2>
//         <span>Photo: {props.selectedRental.photo}</span>
//         <br />
//         <span>Location: {props.selectedRental.location}</span>
//         <br />
//         <span>Reviews: {props.selectedRental.review}</span>
//         <br />
//     </section>
// )
// }
