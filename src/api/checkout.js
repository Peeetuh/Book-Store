// const BASE_URL = "https://sensationnel-maison-12931.herokuapp.com";
const BASE_URL = "http://localhost:3000";

const stripeCheckoutRequest = async (userId, orderPrice) => {
  try {
    const response = await fetch(
      `${BASE_URL}/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          orderPrice,
        }),
      }
    );
    const body = await response.json();
    window.location.href = body.url
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

export { stripeCheckoutRequest };
