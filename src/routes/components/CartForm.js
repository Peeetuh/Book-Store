import { useState } from "react";
import { addBookToCart } from "../../api";

const CartForm = ({ userId, token }) => {
  const [bookQuantity, setBookQuantity] = useState(1);
  const price = 5.99;
  const bookId = 5;

  const addToCartSubmitHandler = async (event) => {
    event.preventDefault();
    const addedBook = await addBookToCart(userId, price, bookId, bookQuantity);
    console.log("addedBook", addedBook)
  };

  return (
    <form onSubmit={addToCartSubmitHandler}>
      <label>Quantity</label>
      <select
        name="selectList"
        onChange={(e) => setBookQuantity(e.target.value)}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
      <button type="submit">Add to Cart</button>
    </form>
  );
};

export default CartForm;
