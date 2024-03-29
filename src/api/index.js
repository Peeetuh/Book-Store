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
        guestCart,
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

export const editUsersAddress = async (
  token,
  userId,
  state,
  city,
  street,
  zip
) => {
  try {
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
        zip,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

export const getUserWishlist = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me/wishlist`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("wishlistData", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addBookToWishlist = async (token, userId, bookId) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        bookId,
      }),
    });
    const data = await response.json();
    console.log("wishlistData", data.result[0]);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBookFromWishlist = async (token, wishlistId) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me/wishlist`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        wishlistId,
      }),
    });
    const data = await response.json();
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
  quantity
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

export const searchRequestCount = async (searchString) => {
  try {
    const response = await fetch(`${BASE_URL}/search/${searchString}`, {
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

export const searchRequest = async (searchString, currentPage) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/${searchString}/${currentPage}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
