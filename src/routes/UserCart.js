import { useState, useEffect } from "react";
import {
  fetchUsersCart,
  /* deleteFromCart, */ updateCartQuantity,
} from "../api";
import { stripeCheckoutRequest, userCompleteOrderReq } from "../api/checkout";
import { Selector, DeleteFromCartButton } from "./components/";

const UserCart = ({ userId, username, token, setIsLoading }) => {
  const [userCart, setUserCart] = useState([]);
  const [bookQuantity, setBookQuantity] = useState(1);
  const [stripeConfirm, setStripeConfirm] = useState(false);
  const [stripeCancel, setStripeCancel] = useState(false);
  const [stripeMsg, setStripeMsg] = useState(false);
  const [stripeRes, setStripeRes] = useState(false);
  const [currOrderId, setCurrOrderId] = useState(null);
  let inventory = 15;

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await stripeCheckoutRequest(
        userCart.orderPrice,
        userCart.orderId,
        userId
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserCart = async () => {
    setIsLoading(true);
    try {
      const fetchedCart = await fetchUsersCart(token);
      setUserCart(fetchedCart);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const queryStr = query.toString();
    if (query.get("success")) {
      setStripeConfirm(true);
      setCurrOrderId(Number(queryStr.slice(queryStr.indexOf("?") + 13)));
    }
    if(query.get("canceled")) {
      setStripeCancel(true);
    }
    if (token) loadUserCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (stripeConfirm) {
      const closeOrder = async () => {
        const result = await userCompleteOrderReq(token, currOrderId);
        console.log("result", result);
      };
      closeOrder();
      loadUserCart();
      setStripeConfirm(false);
      setStripeRes(true);
      setStripeMsg(`Your order ${currOrderId} is complete. We'll let you know when it ships. Thanks for your business, ${username}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripeConfirm]);

  useEffect(() => {
    setIsLoading(true);
    try {
      if (stripeCancel) {
        setStripeCancel(false);
        setStripeRes(true);
        setStripeMsg("Your order has been cancelled.");
      }
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripeCancel]);

  return (
    <main>
      <h2>{username}&#39;s Checkout Page</h2>
      {stripeRes && (<p>{stripeMsg}</p>)}
      {userCart.length < 1 ? (
        <p>Your shopping cart is empty.</p>
      ) : (
        <>
          {userCart.orderDetails.map((cart) => {
            console.log("cart", cart);
            return (
              <div key={cart.bookId}>
                <h3>{cart.title}</h3>
                <img src={cart.imageLinkS} alt={cart.title} />
                <h6>Price: {cart.bookPrice}</h6>
                <h6>Quantity: {cart.quantity}</h6>
                <DeleteFromCartButton
                  token={token}
                  userCart={userCart}
                  setUserCart={setUserCart}
                  cart={cart}
                />
                <div>
                  <label>Change Order Quantity</label>
                  <select
                    name="selectList"
                    onChange={(e) => setBookQuantity(e.target.value)}
                  >
                    <Selector inventory={inventory} />
                  </select>
                  <button
                    type="confirm"
                    onClick={(event) => {
                      event.preventDefault();
                      updateCartQuantity(
                        userCart.orderId,
                        cart.bookId,
                        cart.bookPrice,
                        cart.quantity,
                        bookQuantity
                      );
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            );
          })}
          <h4>Cart Total: {userCart.orderPrice}</h4>
          <form onSubmit={submitHandler}>
            <button type="submit">Proceed to Checkout</button>
          </form>
        </>
      )}
    </main>
  );
};

export default UserCart;
