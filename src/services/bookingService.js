const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/bookings`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            },)

        //   parsing through json below:
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export {
    index,
};



const addBooking = async (formData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        console.log(res)
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export {
    addBooking,
};
