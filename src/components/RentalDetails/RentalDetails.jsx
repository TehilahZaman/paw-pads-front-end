import { useParams } from "react-router"
import { useState, useEffect } from 'react';
import * as rentalService from '../../services/rentalService';


const RentalDetails = () => {

    
    const { rentalId } = useParams();
    console.log('rentalId', rentalId);

    const [rental, setRental] = useState(null);

    useEffect(() => {
        const fetchRental = async () => {
            const rentalData = await rentalService.show(rentalId);
            setRental(rentalData);
        };
        fetchRental();
    }, [rentalId]);

    console.log('rental date:', rental)

    return (
    <main>
        <section>
            <header>
                <p></p>
                <h1>{rental.name}</h1>
                <p>

                </p>
            </header>
            <p>{rental.photo}</p>
            <p>{rental.location}</p>
            <p>{rental.typeOfRental}</p>
            <p>{rental.padOwner}</p>
        </section>
        <section>
            <h2>Reviews:</h2>
            {!rental.reviews.map((review) => (
                <article key={review._id}>
                    <head>
                        <p>
                            {`${review.author.usernam} post on
                            ${new Date(review.createdAt).toLocaleDateString()}`}
                        </p>
                    </head>
                    <p>{review.text}</p>
                </article>
            ))}
        </section>
    </main>
    )
};

export default RentalDetails

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