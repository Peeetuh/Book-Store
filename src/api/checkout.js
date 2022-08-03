// const BASE_URL = "https://sensationnel-maison-12931.herokuapp.com/api";
const BASE_URL = "http://localhost:4000/api";

const stripeCheckoutRequest = async (orderPrice, orderId, userId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/create-checkout-session`,
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

export { stripeCheckoutRequest, guestCompleteOrderReq, userCompleteOrderReq };