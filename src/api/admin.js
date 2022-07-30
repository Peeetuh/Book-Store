const BASE_URL = "https://sensationnel-maison-12931.herokuapp.com/api";
// const BASE_URL = "http://localhost:3000/api";

// USERS

const allUsersRequest = async (token) => {
  try {
    console.log("token at all users request:", token);
    const response = await fetch(`${BASE_URL}/admin/users/all-users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

const deactivateUserRequest = async (token, userId) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/users/deactivate`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

const promoteUserRequest = async (token, userId) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/users/promote`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

// ORDERS

const allOrdersRequest = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/orders/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

// PRODUCTS

const paginatedBooksData = async (token, currentPage) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/books/${currentPage}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

const addBookRequest = async (
  token,
  isbn,
  title,
  author,
  year,
  publisher,
  imageLink,
  genre,
  description,
  price,
  inventory
) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/books/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        isbn,
        title,
        author,
        year,
        publisher,
        imageLink,
        genre,
        description,
        price,
        inventory,
      }),
    });
    const data = response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

const editBookRequest = async (
  token,
  bookId,
  isbn,
  title,
  author,
  year,
  publisher,
  imageLink,
  genre,
  description,
  price,
  inventory
) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/books/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        isbn,
        title,
        author,
        year,
        publisher,
        imageLink,
        genre,
        description,
        price,
        inventory,
      }),
    });
    const data = response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

const deactivateBookRequest = async (token, bookId) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "authorization/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const data = response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

export {
  allUsersRequest,
  deactivateUserRequest,
  promoteUserRequest,
  allOrdersRequest,
  paginatedBooksData,
  addBookRequest,
  deactivateBookRequest,
  editBookRequest,
};
