const BASE_URL = "https://sensationnel-maison-12931.herokuapp.com/api";
// const BASE_URL = "http://localhost:4000/api";

export const fetchRegister = async (userEmail, password, guestCart) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail,
        password,
        guestCart,
      }),
    });
    const data = await response.json();
    // console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLogin = async (userEmail, password, guestCart) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail,
        password,
        guestCart
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserAccount = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const setAddress = async (token, userId, state, city, street, zip) => {
//   try {
//     const response = await fetch(`${BASE_URL}/users/${userId}/update` , {
//       method: "PATCH" ,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         state,
//         city,
//         street,
//         zip,
//       }),
//     })
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log(error)
//   }
// };
export const editUser = async (token, userId, state, city, street, zip) => {
  try {
    console.log(state, city, street, zip)
    const response = await fetch(`${BASE_URL}/users/${userId}/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        state,
        city,
        street,
        zip
      })
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

export const addBookToCart = async (userId, price, bookId, quantity) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        bookPrice: price,
        bookId,
        quantity,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUsersCart = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me/cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCartQuantity = async (
  orderId,
  bookId,
  bookPrice,
  oldQuantity,
  newQuantity
) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/cart`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        bookId,
        bookPrice,
        oldQuantity,
        newQuantity,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFromCart = async (
  orderId,
  bookId,
  bookPrice,
  quantity,
  // userCart,
  // setUserCart
) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        bookId,
        bookPrice,
        quantity,
      }),
    });
    const data = await response.json();
    // console.log("data", data);
    // if (data) {
    //   const newCart = userCart.filter((cart) => cart.id !== bookId);
    //   setUserCart(newCart);
    // }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const requestCuratedRanking = async () => {
  try {
    const response = await fetch(`${BASE_URL}/books/lists/curated-rankings`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const requestFeatured = async () => {
  try {
    const response = await fetch(`${BASE_URL}/books/lists/featured`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const searchRequest = async (searchstring) => {
  try {
    const response = await fetch(`${BASE_URL}/search/${searchstring}`, {
      //
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const requestTopRated = async () => {
  const response = await fetch(`${BASE_URL}/books/lists/curated-ratings`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const dataTopRated = await response.json();
  // console.log(dataTopRated);
  return dataTopRated;
};

export const fetchSingleBook = async (bookId) => {
  try {
    const response = await fetch(`${BASE_URL}/books/${bookId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountByGenre = async (genre) => {
  try {
    const response = await fetch(`${BASE_URL}/books/count/${genre}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

export const fetchBooksByGenrePaginated = async (genre, currentPage) => {
  try {
    const response = await fetch(
      `${BASE_URL}/books/genre/${genre}/${currentPage}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

export const requestAuthor = async (authorName) => {
  try {
    const response = await fetch(`${BASE_URL}/authors/${authorName}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const authorData = await response.json();
    return authorData;
  } catch (error) {
    console.log(error);
  }
};
