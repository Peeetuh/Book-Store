import { useState, useEffect } from "react";
import {
  fetchUsersCart,
  deleteFromCart,
  updateCartQuantity,
  checkoutCart,
} from "../api";
import Selector from "./components/Selector";

const UserCart = ({ username, token }) => {
  const [userCart, setUserCart] = useState([]);
  const [bookQuantity, setBookQuantity] = useState(1);
  const [checkedOut, setCheckkout] = useState(false);

  let inventory = 15;

  useEffect(() => {
    const loadUserCart = async () => {
      const fetchedCart = await fetchUsersCart(token);
      setUserCart(fetchedCart);
    };
    loadUserCart();
  });

  const checkoutClickHandler = async (event) => {
    event.preventDefault();

    await checkoutCart(token, userCart.orderId);
    alert("You've checked out");
  };

  return (
    <main>
      <h2>{username} Checkout</h2>
      {userCart.length < 1 ? (
        <h5>There is nothing in your cart</h5>
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
                <button
                  className="button"
                  type="button"
                  onClick={async () => {
                    deleteFromCart(
                      userCart.orderId,
                      userCart.orderPrice,
                      cart.bookId,
                      cart.bookPrice,
                      cart.quantity,
                      userCart,
                      setUserCart
                    );
                  }}
                >
                  Delete
                </button>
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
        </>
      )}
      <h4>Cart Total: {userCart.orderPrice}</h4>
      <button type="checkout" onClick={checkoutClickHandler}>
        Checkout
      </button>
    </main>
  );
};

export default UserCart;
