import { useState } from "react";

const initialState = { name: "", text: "" };

export default function ReviewForm() {
  const [formData, setFormData] = useState(initialState);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormData(initialState);
  }

  return (
    <form>
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
      <button type="submit" onClick={handleSubmit}>
        Subit
      </button>
    </form>
  );
}
