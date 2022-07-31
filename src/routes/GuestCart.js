import { useEffect, useState } from "react";
import { Selector } from "./components"

const GuestCart = () => {
  let guestCart = JSON.parse(window.localStorage.getItem("GuestCartData"))

  // const [guestCart, setGuestCart] = useState(guestCartData) 

  // useEffect(() => {
  //   const loadGuestCart = () => {
  //     const guestCartData = JSON.parse(window.localStorage.getItem("GuestCartData"))
  //     setGuestCart(guestCartData);
  //   };
  //   loadGuestCart();
  // }, []);
  
  // console.log("Parse", guestCart)
  // //const [bookQuantity, setBookQuantity] = useState();
  // //const [updateBookQuantity, setUpdateBookQuantity] = useState();

  const calculateOrderPrice = (guestCart) => {
    const totalPrice = guestCart.reduce((total, cart) => {
      return total + (cart.bookQuantity * cart.price)
    }, 0
    );

    return totalPrice.toFixed(2)
  }

  // const deleteFromGuestCart = (guestCart, bookId) => {
  //   const newCartData = guestCart.filter((cart) => {
  //     return cart.id !== bookId;
  //   })

  //   console.log("newCartData", newCartData)

  //   setGuestCart(newCartData)
  // }

  const checkoutClickHandler = (event) => {
    event.preventDefault();
    
  }
    
    return (
      <main>
      <h2>Guest Checkout</h2>
      {guestCart.length < 1 ? (
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
                {/* <button
                  className="button"
                  type="button"
                  onClick={deleteFromGuestCart(guestCart, cart.id)}
                >
                  Delete
                </button> */}
                {/* <div>
                  <label>Change Order Quantity</label>
                  <select
                    name="selectList"
                    onChange={(e) => setUpdateBookQuantity(e.target.value)}
                  >
                    <Selector inventory={cart.inventory} />
                  </select>
                  <button
                    type="confirm"
                    onClick={(event) => {
                      event.preventDefault();
                      setBookQuantity(updateBookQuantity)


                    }}
                  >
                    Confirm
                  </button>
                </div> */}
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
  }

  export default GuestCart;

  