import { useEffect, useState } from "react";
import { Selector } from "./components";

const GuestCart = () => {
  const [guestCart, setGuestCart] = useState(
    JSON.parse(window.localStorage.getItem("GuestCartData")) || []
  );
  const [updatedBookQuantity, setUpdatedBookQuantity] = useState();

  useEffect(() => {
    const loadGuestCart = () => {
      const guestCartData = JSON.parse(
        window.localStorage.getItem("GuestCartData") || []
      );
      setGuestCart(guestCartData);
    };
    loadGuestCart();
  }, []);

  const calculateOrderPrice = (guestCart) => {
    const totalPrice = guestCart.reduce((total, cart) => {
      return total + cart.bookQuantity * cart.price;
    }, 0);

    return totalPrice.toFixed(2);
  };

  const checkoutClickHandler = (event) => {
    event.preventDefault();
  };

  return (
    <main>
      <h2>Guest Checkout</h2>
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
                    onChange={(e) => setUpdatedBookQuantity(e.target.value)}
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
        </>
      )}
      <h4>Cart Total: ${calculateOrderPrice(guestCart)}</h4>
      <button type="checkout" onClick={checkoutClickHandler}>
        Checkout
      </button>
    </main>
  );
};

export default GuestCart;
