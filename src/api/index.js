const BASE_URL = "https://sensationnel-maison-12931.herokuapp.com/api";

export const fetchRegister = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: username,
        password: password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLogin = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: username,
        password: password,
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
    console.log("datafromIndex", data);
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

export const updateCartQuantity = async (orderId, bookId, bookPrice, oldQuantity, newQuantity) => {
  try{
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
  } catch(error) {
    console.log(error)
  }
}

export const deleteFromCart = async (
  orderId,
  orderPrice,
  bookId,
  bookPrice,
  quantity,
  userCart,
  setUserCart
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
    console.log("data", data);
    if (data) {
      const newCart = userCart.filter((cart) => cart.id !== bookId);
      setUserCart(newCart);
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkoutCart = async (token, orderId) => {
  try{
    const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data

  } catch(error) {
    console.log(error)
  }
}

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

export const requestTopRated = async () => {
  try {
    const response = await fetch(`${BASE_URL}/books/lists/curated-ratings`, {
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
