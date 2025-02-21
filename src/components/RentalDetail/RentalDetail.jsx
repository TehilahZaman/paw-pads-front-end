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
    <main>Rental Detials</main>
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