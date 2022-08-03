import { useState } from "react";
import { addBookToCart } from "../../api";
import Selector from "./Selector";

const CartForm = ({
  userId,
  price,
  id,
  inventory,
  bookImage,
  title,
  author,
}) => {
  const [bookQuantity, setBookQuantity] = useState(1);

  const addToCartSubmitHandler = async (event) => {
    event.preventDefault();
    // console.log("userId", userId)
    if (userId) {
      await addBookToCart(userId, price, id, bookQuantity);
      alert("Book added to cart");
    } else {
      let existingEntries = JSON.parse(localStorage.getItem("GuestCartData")) || [];
      let newBook = {
        id,
        title,
        author,
        bookImage,
        inventory,
        price,
        bookQuantity,
      };
      // console.log("exsitingEntries", existingEntries)
      console.log("new book", newBook);
      if (existingEntries.length < 1) {
        console.log("sarah")
        existingEntries = [];
        existingEntries.push(newBook);
        localStorage.setItem("GuestCartData", JSON.stringify(existingEntries));
      } else {
        const checkForBook = existingEntries.filter((book) => {
          console.log("book.id", book.id);
          console.log("newBook.id", newBook.id);

          if (book.id === newBook.id) {
            const newQuantity = newBook.bookQuantity + book.bookQuantity;
            newBook.bookQuantity = newQuantity;
          }
          return book.id !== newBook.id;
        });
        checkForBook.push(newBook);
        localStorage.setItem("GuestCartData", JSON.stringify(checkForBook));
        console.log("checkForBook", checkForBook);
      }
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
