import { useEffect, useState } from "react";
import { guestCompleteOrderReq, guestCancelOrder } from "../api/checkout";
import {
  GuestCheckoutModal,
  AuthResponseModal,
  CartInventoryModal,
} from "./components";

import "./GuestCart.css";

const GuestCart = ({ guestCart, setGuestCart, setIsLoading }) => {
  const [updatedBookQuantity, setUpdatedBookQuantity] = useState(1);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const [stripeConfirm, setStripeConfirm] = useState(false);
  const [stripeCancel, setStripeCancel] = useState(false);
  const [stripeRes, setStripeRes] = useState(false);
  const [stripeMsg, setStripeMsg] = useState("");
  const [currOrderId, setCurrOrderId] = useState(null);
  const [resModal, setResModal] = useState(false);
  const [resData, setResData] = useState({});
  const [cartModal, setCartModal] = useState(false);

  const calculateOrderPrice = (guestCart) => {
    const totalPrice = guestCart.reduce((total, cart) => {
      return total + cart.bookQuantity * cart.price;
    }, 0);
    return totalPrice.toFixed(2);
  };
  const checkoutClickHandler = () => setIsCheckingOut(true);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const queryStr = query.toString();
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
        setStripeRes(true);
        setStripeMsg(
          `Your order ${currOrderId} is complete. We'll let you know when it ships. Thanks for your business!`
        );
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
        setStripeRes(true);
        setStripeMsg("Your order has been cancelled.");
      }
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripeCancel]);

  return (
    <main className="cartpage">
      <h2>Guest Checkout</h2>
      {resModal && (
        <AuthResponseModal resData={resData} setResModal={setResModal} />
      )}
      {isCheckingOut && (
        <GuestCheckoutModal
          setIsCheckingOut={setIsCheckingOut}
          setIsLoading={setIsLoading}
          guestEmail={guestEmail}
          setGuestEmail={setGuestEmail}
          guestCart={guestCart}
          setResModal={setResModal}
          setResData={setResData}
        />
      )}
      {stripeRes && <p>{stripeMsg}</p>}
      {!guestCart.length ? (
        <h5>There is nothing in your cart</h5>
      ) : (
        <>
          {guestCart.map((cart) => {
            return (
              <div id="guest-cart-container" key={cart.id}>
                <h3>{cart.title}</h3>
                <h6>Price: {cart.price}</h6>
                <h6>
                  No. in your cart: {cart.bookQuantity} | No. available:{" "}
                  {cart.inventory}
                </h6>
                <button
                  className="delete-from-cart"
                  type="button"
                  onClick={() => {
                    const newCartData = guestCart.filter((book) => {
                      return book.id !== cart.id;
                    });
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
                  <input
                    id="input-quantity"
                    type="number"
                    min="1"
                    max="100"
                    placeholder={1}
                    onChange={(e) =>
                      setUpdatedBookQuantity(Number(e.target.value))
                    }
                  />
                  <button
                    className="user-cart-confirm"
                    type="confirm"
                    onClick={(event) => {
                      event.preventDefault();
                      if (updatedBookQuantity > cart.inventory) {
                        setCartModal(true);
                      } else {
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
                      }
                    }}
                  >
                    Confirm
                  </button>
                </div>
                {cartModal && (
                  <CartInventoryModal
                    setCartModal={setCartModal}
                    title={cart.title}
                    inventory={cart.inventory}
                  />
                )}
              </div>
            );
          })}
          <h4>Cart Total: ${calculateOrderPrice(guestCart)}</h4>
          <button className="user-cart-confirm" onClick={checkoutClickHandler}>
            Checkout as Guest
          </button>
        </>
      )}
    </main>
  );
};

export default GuestCart;
