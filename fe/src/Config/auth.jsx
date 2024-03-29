// getUser.js
export default function getUser() {
  return fetch("http://localhost:5000/auth/user/login/success", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error("authentication has been failed!");
    }).then((data) => {
      // Return the success status and the user data
      return { isAuthenticated: data.success, user: data.user };
    })
    .catch((err) => {
      console.log(err);
      return { isAuthenticated: false, user: null };
    });
};

// export default getUser;
