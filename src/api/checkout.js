// const BASE_URL = "https://sensationnel-maison-12931.herokuapp.com/api";
const BASE_URL = "http://localhost:4000/api";

// STRIPE

const stripeCheckoutRequest = async (orderPrice, orderId, userId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/create-checkout-session`,
      // `https://sensationnel-maison-12931.herokuapp.com/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderPrice,
          orderId,
          userId,
        }),
      }
    );
    const body = await response.json();
    window.location.href = body.url;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

// USERS

const userCompleteOrderReq = async (token, orderId) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
      method: "POST",
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

// GUESTS

const guestCheckoutRequest = async (guestEmail, guestCart) => {
  try {
    const response = await fetch(`${BASE_URL}/guests/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guestEmail,
        guestCart,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

const guestCompleteOrderReq = async (orderId, guestCart) => {
  try {
    const response = await fetch(`${BASE_URL}/guests/checkout`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        guestCart,
      }),
    });
    const data = response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

const guestCancelOrder = async (orderId) => {
  try {
    const response = await fetch(`${BASE_URL}/guests/checkout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
      }),
    });
    const data = response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

export {
  stripeCheckoutRequest,
  guestCompleteOrderReq,
  userCompleteOrderReq,
  guestCheckoutRequest,
  guestCancelOrder,
};
