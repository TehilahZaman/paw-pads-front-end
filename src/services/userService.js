// src/services/userService.js
// src/services/userService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;


const index = async () => {
    try {
      // Change the fetch request so that it includes the Authorization header

      // EXAMPLE OF MAKING A REQUEST AFTER YOU ARE LOGGED IN, 
      // ALL LOGGED REQUEST MUST HAVE THE AUTHORIZATION HEADER
      const res = await fetch(BASE_URL, {
        headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}` 
        },
      });
  
      const data = await res.json();
  
      if (data.err) {
        throw new Error(data.err);
      }
  
      return data
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
 
  export { index }