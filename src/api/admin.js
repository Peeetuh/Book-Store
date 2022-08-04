// const BASE_URL = "https://sensationnel-maison-12931.herokuapp.com/api";
const BASE_URL = "http://localhost:4000/api";

// USERS

const usersCountRequest = async () => {
  try {
    const response = await fetch(`${BASE_URL}/admin/users`, {
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

const paginatedUsersRequest = async (token, currentPage) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/users/${currentPage}`, {
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

const ordersCountRequest = async () => {
  try {
    const response = await fetch(`${BASE_URL}/admin/orders`, {
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

const paginatedOrdersRequest = async (token, currentPage) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/orders/${currentPage}`, {
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

const closedOrdersRequest = async (token, currentPage) => {
  try {
    const response = await fetch(
      `${BASE_URL}/admin/orders/closed/${currentPage}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

const openOrdersRequest = async (token, currentPage) => {
  try {
    const response = await fetch(
      `${BASE_URL}/admin/orders/open/${currentPage}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
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

const productCountRequest = async () => {
  try {
    const response = await fetch(`${BASE_URL}/admin/books`, {
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
    });
    const data = response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

export {
  paginatedUsersRequest,
  deactivateUserRequest,
  promoteUserRequest,
  ordersCountRequest,
  paginatedOrdersRequest,
  closedOrdersRequest,
  openOrdersRequest,
  paginatedBooksData,
  addBookRequest,
  deactivateBookRequest,
  editBookRequest,
  productCountRequest,
  usersCountRequest,
};
