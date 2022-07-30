import { useState } from "react";
import { addBookToCart } from "../../api";
import Selector from "./Selector";

const CartForm = ({ userId, price, id, inventory }) => {
  const [bookQuantity, setBookQuantity] = useState(1);
  //const [guestCart, setGuestCart] = useState([])

  const addToCartSubmitHandler = async (event) => {
    event.preventDefault();

    if (userId) {
      await addBookToCart(userId, price, id, bookQuantity);
      alert("Book added to cart");
    } else {
      window.localStorage.setItem("BookId", id);
      alert("Book added to cart");
    }
  };

  return (
    <form onSubmit={addToCartSubmitHandler}>
      <label>Quantity</label>
      <select
        name="selectList"
        onChange={(e) => setBookQuantity(e.target.value)}
      >
        <Selector inventory={inventory} />
      </select>
      {inventory < 15 ? <h6>Only {inventory} left in stock</h6> : null}
      <button type="submit">Add to Cart</button>
    </form>
  );
};

export default CartForm;
