// import './RentalList.css'
import { Link } from "react-router"

export default function RentalList(props){
    console.log(props)
    const rentalLis = props.rentals.map((rental) => {
        return <li key={rental._id}> <Link to={`rentals/${rental._id}`}></Link>{rental.name}</li>
    })

    return (
        <section className={'rental-list'}>
            <h1>Rental List</h1>
            {rentalLis.length !== 0 ? (
                <ul>
                    {rentalLis}
                </ul>
            ) : (
                <h2>No rentals yet!</h2>
            )}
        </section>
    )
}