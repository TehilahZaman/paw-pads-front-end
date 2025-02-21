const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/rentals`;

// index route ...

// create
const createReview = async (rentalId, reviewFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${rentalId}/reviews`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewFormData),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export { createReview };
