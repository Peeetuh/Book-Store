import { useState, useEffect } from "react";
import { fetchUsersCart, deleteFromCart } from "../api";

const UserCart = ({ username, token }) => {
  const [userCart, setUserCart] = useState([]);
  const [checkedOut, setCheckkout] = useState(false);

  useEffect(() => {
    const loadUserCart = async () => {
      const fetchedCart = await fetchUsersCart(token)
      setUserCart(fetchedCart)
    }
    loadUserCart()
  })

  return (
    <main>
      <h2>{username} Checkout</h2>
      {userCart.length < 1 ? (
        <h5>There is nothing in your cart</h5>
      ) : (
        <>
          {userCart.orderDetails.map((cart) => {
            return (
              <div key={cart.bookId} >
                <h3>{cart.title}</h3>
                <img src={cart.imageLinkS} alt={cart.title}/>
                <h6>Price: {cart.bookPrice}</h6>
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
              </div>
            )
          })}
        </>
      )}
      <h4>Cart Total: {userCart.orderPrice}</h4>

    </main>
  );
};

export default UserCart;
