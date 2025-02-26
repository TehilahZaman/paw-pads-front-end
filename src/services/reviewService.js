const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/rentals`;


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

const showReview = async (rentalId, reviewId) => {
  try {
    const res = await fetch(`${BASE_URL}/${rentalId}/reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const updateReview = async (rentalId, reviewId, reviewFormData) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${rentalId}/reviews/${reviewId}/edit`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewFormData),
      }
    );

    const data = res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const deleteReview = async (rentalId, reviewId) => {
  try {
    const res = await fetch(`${BASE_URL}/${rentalId}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
export { createReview, updateReview, deleteReview, showReview };
