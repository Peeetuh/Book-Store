import { useEffect, useState } from "react";
import { Selector } from "./components";
import {
  guestCheckoutRequest,
  stripeCheckoutRequest,
  guestCompleteOrderReq,
  guestCancelOrder,
} from "../api/checkout";

const GuestCart = ({ guestCart, setGuestCart, setIsLoading }) => {
  // const [guestCart, setGuestCart] = useState(
  //   JSON.parse(window.localStorage.getItem("GuestCartData")) || []
  // );
  const [updatedBookQuantity, setUpdatedBookQuantity] = useState();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const [stripeConfirm, setStripeConfirm] = useState(false);
  const [stripeCancel, setStripeCancel] = useState(false);
  const [stripeMessage, setStripeMessage] = useState(false);
  // const []
  const [currOrderId, setCurrOrderId] = useState(null);

  const calculateOrderPrice = (guestCart) => {
    const totalPrice = guestCart.reduce((total, cart) => {
      return total + cart.bookQuantity * cart.price;
    }, 0);
    return totalPrice.toFixed(2);
  };
  const checkoutClickHandler = () => setIsCheckingOut(true);
  const cancelClickHandler = () => setIsCheckingOut(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(guestEmail, guestCart);
      const result = await guestCheckoutRequest(guestEmail, guestCart);
      console.log(result);
      result.error && alert(result.message);
      if (result.status === "checkout") {
        const { orderPrice, orderId } = result;
        await stripeCheckoutRequest(orderPrice, orderId);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const queryStr = query.toString();
    // const idFromQuery = Number(queryStr.slice(queryStr.indexOf("?") + 13));
    setIsLoading(true);

    if (query.get("success")) {
      setStripeConfirm(true);
      setCurrOrderId(Number(queryStr.slice(queryStr.indexOf("?") + 13)));
    }
    if (query.get("canceled")) {
      setStripeCancel(true);
      setCurrOrderId(Number(queryStr.slice(queryStr.indexOf("?") + 14)));
    }
    const loadGuestCart = () => {
      setIsLoading(true);
      try {
        const guestCartData =
          JSON.parse(window.localStorage.getItem("GuestCartData")) || [];
        setGuestCart(guestCartData);
      } finally {
        setIsLoading(false);
      }
    };
    loadGuestCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsLoading(true);
    try {
      if (stripeConfirm) {
        const closeOrder = async () => {
          await guestCompleteOrderReq(currOrderId, guestCart);
        };
        closeOrder();
        setGuestCart([]);
        window.localStorage.removeItem("GuestCartData");
        setStripeConfirm(false);
        setStripeMessage(true);
      }
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripeConfirm]);

  useEffect(() => {
    setIsLoading(true);
    try {
      if (stripeCancel) {
        const deleteOrder = async () => {
          await guestCancelOrder(currOrderId);
        };
        deleteOrder();
        setStripeCancel(false);
        setStripeMessage(true);
      }
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripeCancel]);

  return (
    <main className="cartpage">
      <h2>Guest Checkout</h2>
      {isCheckingOut && (
        <div>
          <form onSubmit={submitHandler}>
            <h3>Checking Out as Guest</h3>
            <label htmlFor="guest-email">
              Please enter your email address:
            </label>
            <input
              id="guest-email"
              type="email"
              required
              onChange={(e) => setGuestEmail(e.target.value)}
            />
            <button onClick={cancelClickHandler}>Cancel</button>
            <button type="submit">Proceed to Checkout</button>
          </form>
        </div>
      )}
      {stripeMessage && !guestCart.length ? (
        <p>
          Your order #{currOrderId} is complete. We'll let you know when it
          ships. Thanks for your business, {guestEmail}!
        </p>
      ) : stripeMessage && guestCart.length (
        <p>Order cancelled.</p>
      )}
      {!guestCart.length ? (
        <h5>There is nothing in your cart</h5>
      ) : (
        <>
          {guestCart.map((cart) => {
            return (
              <div key={cart.id}>
                <h3>{cart.title}</h3>
                <img src={cart.bookImage} alt={cart.title} />
                <h6>Price: {cart.price}</h6>
                <h6>Quantity: {cart.bookQuantity}</h6>
                <button
                  type="button"
                  onClick={() => {
                    const newCartData = guestCart.filter((book) => {
                      return book.id !== cart.id;
                    });

                    //console.log("newCartData", newCartData)
                    localStorage.setItem(
                      "GuestCartData",
                      JSON.stringify(newCartData)
                    );
                    setGuestCart(newCartData);
                  }}
                >
                  Delete
                </button>
                <div>
                  <label>Change Order Quantity</label>
                  <select
                    name="selectList"
                    onChange={(e) =>
                      setUpdatedBookQuantity(Number(e.target.value))
                    }
                  >
                    <Selector inventory={cart.inventory} />
                  </select>
                  <button
                    type="confirm"
                    onClick={(event) => {
                      event.preventDefault();
                      const newCartData = guestCart.filter((book) => {
                        if (book.id === cart.id) {
                          cart.bookQuantity = updatedBookQuantity;
                        }
                        return book;
                      });
                      localStorage.setItem(
                        "GuestCartData",
                        JSON.stringify(newCartData)
                      );
                      setGuestCart(newCartData);
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            );
          })}
          <h4>Cart Total: ${calculateOrderPrice(guestCart)}</h4>
          <button onClick={checkoutClickHandler}>Checkout as Guest</button>
        </>
      )}
    </main>
  );
};

export default GuestCart;
