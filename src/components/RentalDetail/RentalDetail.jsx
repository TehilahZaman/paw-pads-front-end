

export default function RentalDetail(props){
    if(props.selectedRental === null){
        return (
            <section>
                <h2>No Rental Selected</h2>
            </section>
        )
    }


return (
    <section>
        <h2>{props.selectedRental.name}</h2>
        <span>Photo: {props.selectedRental.photo}</span>
        <br />
        <span>Location: {props.selectedRental.location}</span>
        <br />
        <span>Reviews: {props.selectedRental.review}</span>
        <br />
    </section>
)
}